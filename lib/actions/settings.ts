'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

export type SettingsActionState = { ok: boolean; error?: string }

export async function updateSiteSettings(
  _prevState: SettingsActionState,
  formData: FormData,
): Promise<SettingsActionState> {
  const phone = String(formData.get('phone') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const city = String(formData.get('city') ?? '').trim()
  const address = String(formData.get('address') ?? '').trim()

  if (!phone || !email || !city || !address) {
    return { ok: false, error: 'Заполните все поля' }
  }

  await db.siteSettings.upsert({
    where: { id: 'singleton' },
    update: { phone, email, city, address },
    create: { id: 'singleton', phone, email, city, address },
  })

  revalidatePath('/', 'layout')

  return { ok: true }
}
