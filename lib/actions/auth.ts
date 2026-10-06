'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { hashPassword, verifyPassword } from '@/lib/password'
import {
  createSessionToken,
  verifySessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
} from '@/lib/auth'
import { normalizePhone } from '@/lib/phone'

export type LoginActionState = { error?: string }

export async function login(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const identifier = String(formData.get('identifier') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const normalizedPhone = normalizePhone(identifier)

  const admin = await db.adminUser.findFirst({
    where: {
      OR: [
        { email: identifier.toLowerCase() },
        ...(normalizedPhone.length >= 6 ? [{ phone: normalizedPhone }] : []),
      ],
    },
  })
  const valid = admin ? await verifyPassword(password, admin.passwordHash) : false

  if (!admin || !valid) {
    return { error: 'Неверный email/телефон или пароль' }
  }

  const token = await createSessionToken(admin.id)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, sessionCookieOptions())

  redirect('/admin')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect('/admin/login')
}

export type ChangePasswordState = { ok: boolean; error?: string }

export async function changePassword(
  _prevState: ChangePasswordState,
  formData: FormData,
): Promise<ChangePasswordState> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  const adminId = token ? await verifySessionToken(token) : null

  if (!adminId) {
    return { ok: false, error: 'Сессия истекла, войдите заново' }
  }

  const currentPassword = String(formData.get('currentPassword') ?? '')
  const newPassword = String(formData.get('newPassword') ?? '')

  if (newPassword.length < 8) {
    return { ok: false, error: 'Новый пароль должен быть не короче 8 символов' }
  }

  const admin = await db.adminUser.findUnique({ where: { id: adminId } })
  const valid = admin ? await verifyPassword(currentPassword, admin.passwordHash) : false

  if (!admin || !valid) {
    return { ok: false, error: 'Текущий пароль неверен' }
  }

  const passwordHash = await hashPassword(newPassword)
  await db.adminUser.update({ where: { id: admin.id }, data: { passwordHash } })

  return { ok: true }
}
