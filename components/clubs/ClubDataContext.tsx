'use client'

import { createContext, useContext } from 'react'
import type { ClubData } from '@/lib/clubs/types'

const ClubDataContext = createContext<ClubData | null>(null)

export function ClubDataProvider({ data, children }: { data: ClubData; children: React.ReactNode }) {
  return <ClubDataContext.Provider value={data}>{children}</ClubDataContext.Provider>
}

export function useClubData(): ClubData {
  const ctx = useContext(ClubDataContext)
  if (!ctx) throw new Error('useClubData must be used inside ClubDataProvider')
  return ctx
}
