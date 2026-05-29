'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

interface BookingContextValue {
  openBooking: (zoneId?: string) => void
  open: boolean
  initialZone: string | null
  closeBooking: () => void
}

export const BookingContext = createContext<BookingContextValue>({
  openBooking: () => {},
  open: false,
  initialZone: null,
  closeBooking: () => {},
})

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen]             = useState(false)
  const [initialZone, setInitialZone] = useState<string | null>(null)

  const openBooking  = useCallback((zid?: string) => { setInitialZone(zid ?? null); setOpen(true)  }, [])
  const closeBooking = useCallback(() => setOpen(false), [])

  return (
    <BookingContext.Provider value={{ openBooking, open, initialZone, closeBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
