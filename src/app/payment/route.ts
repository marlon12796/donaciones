import { SupabaseClient } from "@/lib/supabase";
import { Payment } from "mercadopago";
import { NextRequest } from "next/server";
import { client } from "../config";
interface PaymentUpdateBody {
  action: string;
  api_version: string;
  data: {
    id: string;
  };
  date_created: string;
  id: string;
  live_mode: boolean;
  type: string;
  user_id: number;
}
const clientSup = SupabaseClient()
export const POST = async (req: NextRequest) => {
  const body: PaymentUpdateBody = await req.json()
  const payment = await new Payment(client).get({ id: body.data.id })
  // const secret = req.headers.get("x-signature-id")
  // if (secret !== process.env.SECRET) return Response.json({ success: false })
  const donation = {
    id: payment.id,
    amount: payment.transaction_amount,
    message: payment.description,
  };

  const result = await clientSup.from("donations").insert(donation)
  return Response.json({ success: true })
}