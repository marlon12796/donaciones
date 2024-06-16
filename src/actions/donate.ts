'use server'

import { client } from '@/app/utils/config'
import { createPayPalClient } from '@/app/utils/paypal'
import type { OrderResponse } from '@/types/main'
import { Preference } from 'mercadopago'

export type Payments = 'mercadopago' | 'paypal'
type PaymentHandler = (formData: FormData) => Promise<{ url: string } | undefined>

const payments: Record<Payments, PaymentHandler> = {
  mercadopago: async (formData: FormData) => {
    try {
      const preference = await new Preference(client).create({
        body: {
          auto_return: 'approved',
          back_urls: {
            success: `${process.env.VERCEL_URL}/thank-you`
          },
          items: [
            {
              id: 'donacion',
              title: formData.get('message') as string,
              quantity: 1,
              unit_price: Number(formData.get('amount'))
            }
          ]
        }
      })
      const runtimeConfig = process.env.NODE_ENV === 'production' ? preference.init_point : preference.sandbox_init_point
      return { url: runtimeConfig ?? '/' }
    } catch (error) {
      console.error('Error processing MercadoPago payment:', error)
    }
  },

  paypal: async (formData: FormData) => {
    try {
      const paypalConfig = await createPayPalClient()
      const order: OrderResponse = await paypalConfig.fetch('/v2/checkout/orders', {
        method: 'POST',
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: formData.get('amount'),
                breakdown:{
                  item_total: {
                    currency_code: 'USD',
                    value: formData.get('amount')
                  }
                }
              },
              items: [
                {
                  name: 'Donacion',
                  description: formData.get('message') as string,
                  quantity: 1,
                  unit_amount: {
                    currency_code: 'USD',
                    value: formData.get('amount')
                  }
                }
              ]
            }
          ],
          payment_source: {
            paypal: {
              experience_context: {
                brand_name: 'MARLON PROGRAMMER',
                user_action: 'PAY_NOW',
                shipping_preference: 'NO_SHIPPING',
                return_url: `${process.env.VERCEL_URL}/thank-you`
              }
            }
          }
        })
      })
      const response = order.links.find((link) => link.rel === 'payer-action')?.href
      return { url: response ?? '/' }
    } catch (error) {
      console.error('Error processing PayPal payment:', error)
    }
  }
}

export const donate = async ({ formData, methodPayment = 'mercadopago' }: { formData: FormData; methodPayment: Payments }) => {
  return await payments[methodPayment](formData)
}
