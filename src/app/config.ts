
import MercadoPagoConfig from "mercadopago";

// const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET!);
export const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN ?? "" })

