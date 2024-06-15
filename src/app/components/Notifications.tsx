"use client"
import { useNotification } from "@/app/hooks/useNotification";
export const Notifications = () => {
  const { notifications } = useNotification()
  const notification = notifications?.[0]
  return (
    notification && <div className="fixed bottom-4 right-4 grid items-center justify-center gap-2 rounded-md border bg-black p-4 text-center">
      <p className="text-2xl font-bold">
        {notification?.amount?.toLocaleString("es-PE", { style: "currency", currency: "PEN" }) ?? ""}
      </p>
      <p>{notification?.message ?? ""}</p>
    </div>
  )
}