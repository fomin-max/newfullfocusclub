interface LogoFullProps {
  className?: string
  height?: number
}

export default function LogoFull({ className = '', height = 36 }: LogoFullProps) {
  const width = Math.round(height * (1529 / 205))
  return (
    <img
      src="/logo-full.svg"
      width={width}
      height={height}
      alt=""
      className={className}
      draggable={false}
    />
  )
}
