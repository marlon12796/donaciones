"use server"

import { client } from "@/app/config"
import { Preference } from "mercadopago"
import { redirect } from "next/navigation"

export const donate = async (formData: FormData) => {
  const preference = await new Preference(client).create({
    body: {
      auto_return: "approved",
      back_urls: {
        success: `${process.env.VERCEL_URL}/thank-you`,
      },
      items: [{
        id: "donacion",
        title: formData.get("message") as string,
        quantity: 1,
        unit_price: Number(formData.get("amount"))
      }]
    }
  })
  const runtimeConfig = process.env.NODE_ENV === "production" ? preference.init_point : preference.sandbox_init_point
  redirect(runtimeConfig ?? "")
}