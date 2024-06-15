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
      <Button type="submit" className="bg-blue-500/70 hover:bg-blue-500 flex  gap-2 items-center"> <span className="size-6 grid place-items-center"><svg className="svgIcon" viewBox="0 0 576 512"><path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path></svg></span> Mercado Pago</Button>
    </form>
  );
};
