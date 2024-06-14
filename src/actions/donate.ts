"use server"

import { client } from "@/app/config"
import { Preference } from "mercadopago"
import { redirect } from "next/navigation"

export const donate = async (formData: FormData) => {
  const preference = await new Preference(client).create({
    body: {
      items: [{
        id: "donacion",
        title: formData.get("message") as string,
        quantity: 1,
        unit_price: Number(formData.get("amount"))
      }]
    }
  })
  redirect(preference?.sandbox_init_point ?? "")
}