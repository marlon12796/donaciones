'use client'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { type Payments, donate } from '@/actions/donate'
import SvgComponent from './Svg'
import { useState, useTransition } from 'react'
// const openPopup = (url: string) => {
//   const width = 600
//   const height = 400
//   const left = window.innerWidth / 2 - width / 2
//   const top = window.innerHeight / 2 - height / 2
//   const options = `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`

//   window.open(url, '_blank', options)
// }
export const Form = () => {
  const [platform, setPlatform] = useState<Payments>('mercadopago')
  const [isPending, startTransition] = useTransition()
  const submitData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    startTransition(async () => {
      const formData = new FormData(event.currentTarget)
      const response = await donate({ formData, methodPayment: platform })
      if (response !== undefined && 'url' in response) {
        window.location.href = response.url
      } else {
        alert('Something went wrong')
      }
    })
  }

  return (
    <form onSubmit={submitData} className='m-auto grid max-w-96 min-w-96 gap-8 border p-4'>
      <Label className='grid gap-2'>
        <span className='mb-2'>Valor</span>
        <Input name='amount' type='number' min='0.01' step='0.01' required pattern='^\d+(\.\d{1,2})?$' title='Ingresa una cantidad valida (e.g., 10.50)' />
      </Label>
      <Label className='grid gap-2'>
        <span className='mb-2'>Tu mensaje en la donación</span>
        <Textarea
          name='message'
          className='resize-none max-h-40 [field-sizing:content]'
          required
          title='Please enter a valid message with alphabetic characters only'
        />
      </Label>
      <div className='flex justify-center gap-4'>
        <Button type='submit' className='bg-blue-500/70 hover:bg-blue-500 flex  gap-2 items-center' disabled={isPending}>
          <span className='size-6 grid place-items-center'>
            <SvgComponent.MercadoPago />
          </span>
          Mercado Pago
        </Button>
        <Button type='submit' className='bg-blue-600/70 hover:bg-blue-700 flex gap-2 items-center' onClick={() => setPlatform('paypal')} disabled={isPending}>
          <span className='size-6 grid place-items-center'>
            <SvgComponent.Paypal />
          </span>
          Pagar Paypal
        </Button>
      </div>
    </form>
  )
}
