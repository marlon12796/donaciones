import { createPayPalClient } from '@/app/utils/paypal'
import { SupabaseClient } from '@/lib/supabase'
import type { VerifyPaypalSignature } from '@/types/main'
import type { PaypalHook } from '@/types/paypalHook'
import type { NextRequest } from 'next/server'

export const POST = async (req: NextRequest) => {
  const [body, paypalConfig] = await Promise.all([req.json() as unknown as PaypalHook, createPayPalClient()])
  const clientSup = SupabaseClient()
  if (!body) return Response.json({ error: 'Se le olvidó Body' }, { status: 400 })
  const headers = Object.fromEntries(
    ['auth-algo', 'cert-url', 'transmission-id', 'transmission-sig', 'transmission-time'].map((header) => [
      header.replace('-', '_'),
      req.headers.get(`paypal-${header}`)
    ])
  )

  try {
    const payload = {
      ...headers,
      webhook_id: process.env.PAYPAL_WEBHOOK_SECRET ?? '',
      webhook_event: body
    }
    const data: VerifyPaypalSignature = await paypalConfig.fetch(`/v1/notifications/verify-webhook-signature`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    if (data.verification_status !== 'SUCCESS') return Response.json({ error: 'Invalido signature' }, { status: 400 })
    if (body.event_type === 'CHECKOUT.ORDER.APPROVED') {
      const unit = body.resource.purchase_units[0]
      const item = unit.items[0]
      const donation = {
        amount: Number.parseFloat(item.unit_amount.value),
        message: item.description
      }
      await clientSup.from('donations').insert(donation)
      console.log('first')
    }
    return Response.json({ message: 'Webhook signature verificado satisfactoriamente' }, { status: 200 })
  } catch (_error) {
    return Response.json({ error: 'Error interno del servidor' }, { status: 400 })
  }
}
