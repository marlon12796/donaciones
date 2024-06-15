import { SupabaseClient } from "@/lib/supabase";
import { Form } from "@/app/components/Form";
import { TableDonation } from "@/app/components/TableDonation";
import { Notifications } from "../components/Notifications";
export interface Donation {
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
export const revalidate = 0
const Home = async () => {
  const donations = await getDonations()
  return (
    <section className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
      <header className="text-xl font-bold leading-[4rem]">Donaciones</header>
      <main className="py-8">
        <section className="grid gap-12">
          <Form />
          <TableDonation donations={donations} />
        </section>
      </main>
      <footer className="text-center leading-[4rem] opacity-70 dark:text-white">
        © {new Date().getFullYear()} stream-donancy
      </footer>
      <Notifications />
    </section>
  );
}
export default Home