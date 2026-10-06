'use client'

import { useActionState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LeadActionState } from '@/lib/actions/leads'

type Field =
  | { type: 'text' | 'tel' | 'email'; name: string; label: string; required?: boolean; span?: 2 }
  | { type: 'textarea'; name: string; label: string; required?: boolean; span?: 2 }
  | {
      type: 'select'
      name: string
      label: string
      placeholder: string
      options: string[]
      span?: 2
    }

type LeadFormProps = {
  fields: Field[]
  submitLabel: string
  sentLabel: string
  note: string
  tone?: 'default' | 'onLime' | 'onBlue'
  className?: string
  action: (prevState: LeadActionState, formData: FormData) => Promise<LeadActionState>
}

const inputClassByTone = {
  default:
    'border-b border-brand-border-strong bg-transparent px-0 py-4 text-brand-ink outline-none placeholder:text-brand-muted-faintest focus:border-brand-ink',
  onLime:
    'border-b border-brand-lime-ink/40 bg-transparent px-0 py-4 text-lg text-brand-lime-ink outline-none placeholder:text-brand-lime-ink/60 focus:border-brand-ink',
  onBlue:
    'border-b border-white/40 bg-transparent px-0 py-4 text-lg text-white outline-none placeholder:text-white/60 focus:border-brand-lime',
}

const noteClassByTone = {
  default: 'text-brand-muted-faintest',
  onLime: 'text-brand-lime-ink',
  onBlue: 'text-white/70',
}

const buttonClassByTone = {
  default: 'bg-brand-ink text-white hover:bg-brand-lime hover:text-brand-ink',
  onLime: 'bg-brand-ink text-white hover:bg-white hover:text-brand-ink',
  onBlue: 'bg-white text-brand-blue hover:bg-brand-lime hover:text-brand-ink',
}

const errorClassByTone = {
  default: 'text-red-600',
  onLime: 'text-red-700',
  onBlue: 'text-red-200',
}

export function LeadForm({
  fields,
  submitLabel,
  sentLabel,
  note,
  tone = 'default',
  className,
  action,
}: LeadFormProps) {
  const [state, formAction, isPending] = useActionState(action, { ok: false })
  const inputClass = inputClassByTone[tone]

  if (state.ok) {
    return (
      <div className={cn('flex items-center gap-3 sm:col-span-2', className)}>
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-lime text-brand-lime-ink">
          <Check size={18} />
        </span>
        <p
          className={cn('text-sm font-medium', tone === 'onBlue' ? 'text-white' : 'text-brand-ink')}
        >
          {sentLabel}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className={cn('grid gap-4 sm:grid-cols-2', className)}>
      {fields.map((field) => {
        const spanClass = field.span === 2 ? 'sm:col-span-2' : ''
        if (field.type === 'select') {
          return (
            <select
              key={field.name}
              name={field.name}
              aria-label={field.label}
              className={cn(inputClass, spanClass)}
            >
              {/* Явный text-brand-ink: нативный попап опций рендерится браузером
                  со своим светлым фоном независимо от стиля самого select —
                  без этого белый текст (тон onBlue) сливается с ним. */}
              <option value="" className="text-brand-ink">
                {field.placeholder}
              </option>
              {field.options.map((option) => (
                <option key={option} className="text-brand-ink">
                  {option}
                </option>
              ))}
            </select>
          )
        }
        if (field.type === 'textarea') {
          return (
            <textarea
              key={field.name}
              name={field.name}
              required={field.required}
              aria-label={field.label}
              placeholder={field.label}
              rows={3}
              className={cn(inputClass, 'resize-none', spanClass)}
            />
          )
        }
        return (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            required={field.required}
            aria-label={field.label}
            placeholder={field.label}
            className={cn(inputClass, spanClass)}
          />
        )
      })}
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          'mt-1 inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-xs font-bold uppercase tracking-[.16em] transition disabled:opacity-60 sm:col-span-2 sm:justify-self-start',
          buttonClassByTone[tone],
        )}
      >
        {isPending ? 'Отправляем…' : submitLabel} <ArrowUpRight size={15} />
      </button>
      {state.error && (
        <p className={cn('text-xs sm:col-span-2', errorClassByTone[tone])}>{state.error}</p>
      )}
      <p className={cn('text-xs sm:col-span-2', noteClassByTone[tone])}>{note}</p>
    </form>
  )
}
