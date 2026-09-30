import { cn } from '@/lib/utils'

type PillFilterProps<T extends string> = {
  options: readonly T[]
  active: T
  onChange: (value: T) => void
  size?: 'sm' | 'md'
  nowrap?: boolean
  className?: string
}

export function PillFilter<T extends string>({
  options,
  active,
  onChange,
  size = 'sm',
  nowrap = false,
  className,
}: PillFilterProps<T>) {
  const sizeClasses =
    size === 'sm'
      ? 'px-4 py-2 text-[10px] font-semibold tracking-[0.16em]'
      : 'px-5 py-3 text-xs tracking-[.14em]'

  return (
    <div
      className={cn(
        'flex flex-wrap gap-2',
        nowrap && 'flex-nowrap overflow-x-auto pb-3',
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            'rounded-full border uppercase transition',
            sizeClasses,
            nowrap && 'whitespace-nowrap',
            active === option
              ? 'border-brand-ink bg-brand-ink text-white'
              : 'border-brand-border-strong text-brand-muted-faint hover:border-brand-ink',
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
