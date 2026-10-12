import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// «1 место», «3 места», «5 мест»; после «до»/«из» — родительный: «до 21 места», «из 22 мест»
export function seatsLabel(seats: number | string): string {
  const s = String(seats).trim()
  const genitive = /^до\s/i.test(s)
  // уже со словом («4 кресла», «до 3 чел») — не трогаем
  if (/[a-zа-яё]/i.test(s.replace(/^до\s/i, ''))) return s
  const n = Number(s.match(/(\d+)\D*$/)?.[1] ?? NaN)
  return `${s} ${placesWord(n, genitive)}`
}

export function placesWord(n: number, genitive = false): string {
  const d10 = n % 10, d100 = n % 100
  if (d10 === 1 && d100 !== 11) return genitive ? 'места' : 'место'
  if (!genitive && d10 >= 2 && d10 <= 4 && (d100 < 12 || d100 > 14)) return 'места'
  return 'мест'
}
