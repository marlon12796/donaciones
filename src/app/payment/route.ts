import { SupabaseClient } from '@/lib/supabase'
import { Payment } from 'mercadopago'
import type { NextRequest, NextResponse } from 'next/server'
import { client } from '../utils/config'
import crypto from 'crypto'
interface PaymentUpdateBody {
  action: string
  api_version: string
  data: {
    id: string
  }
  date_created: string
  id: string
  live_mode: boolean
  type: string
  user_id: number
}
export const POST = async (req: NextRequest, _res: NextResponse) => {
  const clientSup = SupabaseClient()
  const body: PaymentUpdateBody = await req.json()
  if (!body) return Response.json({ error: 'Missing Body' }, { status: 400 })
  const signature = req.headers.get('x-signature')
  const requestId = req.headers.get('x-request-id')
  if (!signature) return Response.json({ error: 'Missing Signature' }, { status: 400 })
  const ts = signature.split(',')[0].split('=')[1]
  const v1 = signature.split(',')[1].split('=')[1]
  const payment = await new Payment(client).get({ id: body.data.id })
  const template = `id:${body.data.id};request-id:${requestId};ts:${ts};`
  const cyphedSignature = crypto.createHmac('sha256', process.env.MP_WEBHOOK_TOKEN!).update(template).digest('hex')
  if (v1 !== cyphedSignature) {
    return Response.json({ error: 'Invalid Signature' }, { status: 400 })
  }
  const donation = {
    id: payment.id,
    amount: payment.transaction_amount,
    message: payment.description
  }
  if (payment.status === 'approved') {
    await clientSup.from('donations').insert(donation)
  }
  return Response.json({ success: true })
}
