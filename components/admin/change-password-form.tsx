'use client'

import { useActionState, useEffect, useRef } from 'react'
import { changePassword } from '@/lib/actions/auth'

export function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, { ok: false })
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset()
    }
  }, [state.ok])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="max-w-xl rounded-xl border border-brand-border bg-white p-7"
    >
      <h3 className="mb-1 font-medium">Пароль администратора</h3>
      <p className="mb-5 text-xs text-brand-muted-faint">
        Логин (email) задаётся через переменные окружения при первом запуске и не меняется отсюда —
        только пароль.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-2 block text-xs font-medium text-brand-muted-dim">
            Текущий пароль
          </span>
          <input
            type="password"
            name="currentPassword"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-2 block text-xs font-medium text-brand-muted-dim">Новый пароль</span>
          <input
            type="password"
            name="newPassword"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="mt-6 rounded-full bg-brand-ink px-5 py-3 text-xs font-semibold text-white disabled:opacity-60"
      >
        {isPending ? 'Сохраняем…' : 'Сменить пароль'}
      </button>
      {state.ok && <p className="mt-3 text-xs text-brand-lime-ink">Пароль изменён.</p>}
      {state.error && <p className="mt-3 text-xs text-red-600">{state.error}</p>}
    </form>
  )
}
