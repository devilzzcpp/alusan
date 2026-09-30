import { cn } from '@/lib/utils'

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <p className={cn('font-mono text-xs', className)}>{children}</p>
}
