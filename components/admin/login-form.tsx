'use client'

import { useActionState } from 'react'
import { login } from '@/lib/actions/auth'

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, {})

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700">{state.error}</p>
      )}
      <label className="block text-sm">
        <span className="mb-2 block text-xs font-medium text-brand-muted-dim">
          Email или телефон
        </span>
        <input
          type="text"
          name="identifier"
          required
          autoComplete="username"
          className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-2 block text-xs font-medium text-brand-muted-dim">Пароль</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
        />
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {isPending ? 'Входим…' : 'Войти'}
      </button>
    </form>
  )
}
