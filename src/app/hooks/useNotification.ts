import { useEffect, useState } from 'react'

import { SupabaseClient } from '@/lib/supabase'
import type { Donation } from '@/app/(main)/page'

export const useNotification = () => {
  const [notifications, setNotifications] = useState<Donation[]>([])
  const supabase = SupabaseClient()
  useEffect(() => {
    const donations = supabase
      .channel('realtime donations')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'donations' }, (payload) => {
        const data = payload.new as Donation
        setNotifications((notifications) => [...notifications, data])
      })
      .subscribe()
    return () => {
      donations.unsubscribe()
    }
  }, [supabase])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotifications((notifications) => notifications.slice(1))
    }, 5000)
    return () => {
      clearTimeout(timeout)
    }
  })
  return {
    notifications
  }
}
