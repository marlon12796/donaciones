"use client"
import { redirect } from "next/navigation";
// import {createClient} from "@supabase/supabase-js";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { donate } from "@/actions/donate";
import MercadoPagoConfig, { Preference } from "mercadopago";


const Home = () => {
  // const donations = await supabase
  //   .from("donations")
  //   .select("*")
  //   .then(
  //     ({data}) =>
  //       data as unknown as Promise<
  //         {id: number; created_at: number; amount: number; message: string}[]
  //       >,
  //   );

  const submitData = async (formData: FormData) => {
    await donate(formData)
  }

  return (
    <section className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
      <header className="text-xl font-bold leading-[4rem]">Donaciones</header>
      <main className="py-8">
        <section className="grid gap-12">
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
          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cantidad</TableHead>
                <TableHead className="text-right">Mensaje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations.map((donation) => {
                return (
                  <TableRow key={donation.id}>
                    <TableCell className="font-bold">
                      {donation.amount.toLocaleString("es-AR", {
                        style: "currency",
                        currency: "ARS",
                      })}
                    </TableCell>
                    <TableCell className="text-right">{donation.message}</TableCell>
                  </TableRow>
                );
              })} 
            </TableBody>
          </Table> */}
        </section>
      </main>
      <footer className="text-center leading-[4rem] opacity-70">
        © {new Date().getFullYear()} stream-donancy
      </footer>
    </section>
  );
}
export default Home