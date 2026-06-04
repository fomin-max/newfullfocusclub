interface LogoMarkProps {
  size?: number
  className?: string
  gradient?: boolean
}

export default function LogoMark({ size = 22, className = '', gradient = false }: LogoMarkProps) {
  return (
    <svg
      className={`ff-mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 1232 1232"
      fill={gradient ? 'url(#ffMarkGrad)' : 'currentColor'}
      aria-hidden="true"
      focusable="false"
    >
      {gradient && (
        <defs>
          <linearGradient id="ffMarkGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6632FA" />
            <stop offset="1" stopColor="#00FFB6" />
          </linearGradient>
        </defs>
      )}
      <path d="M0 0h1232L980 252H0V0ZM0 485.333V1232l252-252V485.333H0ZM485.333 485.333h252v252h-252v-252Z" />
    </svg>
  )
}
