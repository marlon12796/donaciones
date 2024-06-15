
// import {createClient} from "@supabase/supabase-js";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SupabaseClient } from "@/lib/supabase";
import { Form } from "./components/Form";
interface Donation {
  id: number;
  created_at: string;
  amount: number;
  message: string;
}

const getDonations = async () => {
  const client = SupabaseClient()
  const { data: donations } = await client.from("donations").select("*")
  return donations as Donation[]
}
const Home = async () => {
  const donations = await getDonations()
  console.log(donations)

  return (
    <section className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
      <header className="text-xl font-bold leading-[4rem]">Donaciones</header>
      <main className="py-8">
        <section className="grid gap-12">
          <Form />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cantidad</TableHead>
                <TableHead className="text-right">Mensaje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donations?.map((donation) => {
                return (
                  <TableRow key={donation.id}>
                    <TableCell className="font-bold dark:text-white">
                      {donation.amount.toLocaleString("es-PE", {
                        style: "currency",
                        currency: "PEN",
                      })}
                    </TableCell>
                    <TableCell className="text-right dark:text-white">{donation.message}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </section>
      </main>
      <footer className="text-center leading-[4rem] opacity-70 dark:text-white">
        © {new Date().getFullYear()} stream-donancy
      </footer>
    </section>
  );
}
export default Home