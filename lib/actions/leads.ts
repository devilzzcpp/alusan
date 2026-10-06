'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import type { LeadStatus } from '@prisma/client'

export type LeadActionState = { ok: boolean; error?: string }

export async function submitLead(
  source: string,
  _prevState: LeadActionState,
  formData: FormData,
): Promise<LeadActionState> {
  const name = String(formData.get('name') ?? '').trim()
  const phone = String(formData.get('phone') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const type = String(formData.get('type') ?? '').trim()
  const commentRaw = String(formData.get('comment') ?? '').trim()

  if (!name || !phone) {
    return { ok: false, error: 'Заполните имя и телефон' }
  }

  const comment = [type && `Тип задачи: ${type}`, commentRaw].filter(Boolean).join(' — ')

  await db.lead.create({
    data: {
      name,
      phone,
      email: email || null,
      comment: comment || null,
      source,
    },
  })

  revalidatePath('/admin')

  return { ok: true }
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  await db.lead.update({ where: { id: leadId }, data: { status } })
  revalidatePath('/admin')
}
