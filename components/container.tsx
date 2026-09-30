import { cn } from '@/lib/utils'

const WIDTHS = {
  default: 'max-w-[1440px]',
  narrow: 'max-w-[1200px]',
} as const

export function Container({
  width = 'default',
  className,
  children,
}: {
  width?: keyof typeof WIDTHS
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn('mx-auto px-5 lg:px-10', WIDTHS[width], className)}>{children}</div>
}
