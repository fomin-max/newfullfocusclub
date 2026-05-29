'use client'

import { useReveal } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const [ref, shown] = useReveal(delay)
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn('ff-reveal', shown && 'is-in', className)}
    >
      {children}
    </div>
  )
}
