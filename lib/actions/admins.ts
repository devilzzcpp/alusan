'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/current-admin'
import { hashPassword } from '@/lib/password'
import { normalizePhone } from '@/lib/phone'
import { isUniqueConstraintError } from '@/lib/prisma-errors'

export type AdminActionState = { ok: boolean; error?: string }

export async function createManager(
  _prevState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  const currentAdmin = await getCurrentAdmin()
  if (!currentAdmin || currentAdmin.role !== 'owner') {
    return { ok: false, error: 'Недостаточно прав' }
  }

  const firstName = String(formData.get('firstName') ?? '').trim()
  const lastName = String(formData.get('lastName') ?? '').trim()
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  const phoneRaw = String(formData.get('phone') ?? '').trim()
  const phone = phoneRaw ? normalizePhone(phoneRaw) : null
  const password = String(formData.get('password') ?? '')

  if (!email || !password) {
    return { ok: false, error: 'Email и пароль обязательны' }
  }
  if (password.length < 8) {
    return { ok: false, error: 'Пароль должен быть не короче 8 символов' }
  }

  const passwordHash = await hashPassword(password)

  try {
    await db.adminUser.create({
      data: {
        email,
        phone,
        firstName: firstName || null,
        lastName: lastName || null,
        passwordHash,
        role: 'manager',
      },
    })
  } catch (error) {
    if (isUniqueConstraintError(error, 'email')) {
      return { ok: false, error: 'Аккаунт с таким email уже существует' }
    }
    if (isUniqueConstraintError(error, 'phone')) {
      return { ok: false, error: 'Аккаунт с таким телефоном уже существует' }
    }
    throw error
  }

  revalidatePath('/admin')
  return { ok: true }
}

export async function deleteManager(managerId: string): Promise<AdminActionState> {
  const currentAdmin = await getCurrentAdmin()
  if (!currentAdmin || currentAdmin.role !== 'owner') {
    return { ok: false, error: 'Недостаточно прав' }
  }
  if (managerId === currentAdmin.id) {
    return { ok: false, error: 'Нельзя удалить самого себя' }
  }

  const target = await db.adminUser.findUnique({ where: { id: managerId } })
  if (!target || target.role === 'owner') {
    return { ok: false, error: 'Нельзя удалить владельца' }
  }

  await db.adminUser.delete({ where: { id: managerId } })
  revalidatePath('/admin')

  return { ok: true }
}
