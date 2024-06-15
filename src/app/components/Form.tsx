"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { donate } from "@/actions/donate";

export const Form = () => {
  const submitData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await donate(formData);
  };

  return (
    <form onSubmit={submitData} className="m-auto grid max-w-96 min-w-96 gap-8 border p-4">
      <Label className="grid gap-2">
        <span className="mb-2">Valor</span>
        <Input name="amount" type="number" />
      </Label>
      <Label className="grid gap-2">
        <span className="mb-2">Tu mensaje en la donación</span>
        <Textarea name="message" className="resize-none max-h-40 [field-sizing:content]" />
      </Label>
      <Button type="submit">Enviar</Button>
    </form>
  );
};
