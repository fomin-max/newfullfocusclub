'use client'

import { forwardRef } from 'react'
import { useCardGlow } from '@/lib/hooks'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  brackets?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className, brackets, ...rest }, fwdRef) => {
    const [glowRef, onMove] = useCardGlow()

    const setRef = (node: HTMLDivElement | null) => {
      ;(glowRef as React.MutableRefObject<HTMLDivElement | null>).current = node
      if (typeof fwdRef === 'function') fwdRef(node)
      else if (fwdRef) (fwdRef as React.MutableRefObject<HTMLDivElement | null>).current = node
    }

    return (
      <div
        ref={setRef}
        className={cn('ff-card', brackets && 'ff-card--brackets', className)}
        onMouseMove={onMove}
        {...rest}
      >
        <span className="ff-card__glow" />
        <span style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%', gap: 'inherit' }}>
          {children}
        </span>
      </div>
    )
  }
)
Card.displayName = 'Card'
export default Card
