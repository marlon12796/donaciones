"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { donate } from "@/actions/donate";
export const Form = () => {
  const submitData = async (formData: FormData) => {
    await donate(formData)
  }

  return (
    <form action={submitData} className="m-auto grid max-w-96 gap-8 border p-4">
      <Label className="grid gap-2">
        <span>Valor</span>
        <Input name="amount" type="number" className="text-white" />
      </Label>
      <Label className="grid gap-2">
        <span>Tu mensaje en la donación</span>
        <Textarea name="message" className="text-white" />
      </Label>
      <Button type="submit">Enviar</Button>
    </form>
  )
}
