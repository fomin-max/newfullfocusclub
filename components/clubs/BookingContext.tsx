'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'

export interface BookingTarget {
  zone?:      string  // zone id (legacy, from zone cards)
  seatId?:    string  // Langame UUID
  seatLabel?: string  // e.g. "12 · ARENA" — shown in modal header
}

interface BookingContextValue {
  openBooking:  (target?: BookingTarget) => void
  open:         boolean
  target:       BookingTarget
  closeBooking: () => void
}

export const BookingContext = createContext<BookingContextValue>({
  openBooking:  () => {},
  open:         false,
  target:       {},
  closeBooking: () => {},
})

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open,   setOpen]   = useState(false)
  const [target, setTarget] = useState<BookingTarget>({})

  const openBooking  = useCallback((t: BookingTarget = {}) => { setTarget(t); setOpen(true) }, [])
  const closeBooking = useCallback(() => setOpen(false), [])

  return (
    <BookingContext.Provider value={{ openBooking, open, target, closeBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => useContext(BookingContext)
