'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/current-admin'
import { normalizePhone } from '@/lib/phone'
import { isUniqueConstraintError } from '@/lib/prisma-errors'

export type ProfileActionState = { ok: boolean; error?: string }

export async function updateProfile(
  _prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const currentAdmin = await getCurrentAdmin()
  if (!currentAdmin) {
    return { ok: false, error: 'Сессия истекла, войдите заново' }
  }

  const firstName = String(formData.get('firstName') ?? '').trim()
  const lastName = String(formData.get('lastName') ?? '').trim()
  const email = String(formData.get('email') ?? '')
    .trim()
    .toLowerCase()
  const phoneRaw = String(formData.get('phone') ?? '').trim()
  const phone = phoneRaw ? normalizePhone(phoneRaw) : null

  if (!email) {
    return { ok: false, error: 'Email обязателен' }
  }

  try {
    await db.adminUser.update({
      where: { id: currentAdmin.id },
      data: { firstName: firstName || null, lastName: lastName || null, email, phone },
    })
  } catch (error) {
    if (isUniqueConstraintError(error, 'email')) {
      return { ok: false, error: 'Этот email уже используется другим аккаунтом' }
    }
    if (isUniqueConstraintError(error, 'phone')) {
      return { ok: false, error: 'Этот телефон уже используется другим аккаунтом' }
    }
    throw error
  }

  revalidatePath('/admin')
  return { ok: true }
}
