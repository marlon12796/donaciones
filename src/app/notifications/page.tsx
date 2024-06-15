"use client"
import { SupabaseClient } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { type Donation } from "../page";
const Page = () => {
  const supabase = SupabaseClient()
  const [notifications, setNotifications] = useState<Donation[]>([])
  const notification = notifications?.[0]
  useEffect(() => {
    const donations = supabase.channel('realtime donations')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'donations' },
        (payload) => {
          const data = payload.new as Donation
          setNotifications(notifications => [...notifications, data])
        }
      )
      .subscribe()
    return () => {
      donations.unsubscribe()
    }
  }, [supabase])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotifications(notifications => notifications.slice(1))
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
  },)

  return (
    <section className="absolute bottom-4 right-4 grid items-center justify-center gap-2 rounded-md border bg-black p-4 text-center">
      <p className="text-2xl font-bold">
        {notification?.amount?.toLocaleString("es-PE", { style: "currency", currency: "PE" }) ?? ""}
      </p>
      <p>{notification?.message ?? ""}</p>
    </section>
  )
}
export default Page