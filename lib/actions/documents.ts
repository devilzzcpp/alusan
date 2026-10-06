'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/current-admin'
import { saveAsset, MAX_DOCUMENT_BYTES, deleteAssetsByUrls } from '@/lib/assets'

export type DocumentActionState = { ok: boolean; error?: string }

async function requireAdmin() {
  const admin = await getCurrentAdmin()
  if (!admin) throw new Error('Unauthorized')
}

function readDocumentFields(formData: FormData) {
  return {
    title: String(formData.get('title') ?? '').trim(),
    subtitle: String(formData.get('subtitle') ?? '').trim(),
    category: String(formData.get('category') ?? '').trim(),
    code: String(formData.get('code') ?? '').trim(),
    color: String(formData.get('color') ?? '').trim(),
  }
}

// Файл необязателен — если не выбран (или пустой input на редактировании),
// файл либо не ставится (create), либо остаётся прежним (update).
async function readFile(formData: FormData): Promise<{ url?: string; error?: string }> {
  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) return {}
  const result = await saveAsset(file, MAX_DOCUMENT_BYTES)
  if (result.error) return { error: result.error }
  return { url: result.url }
}

export async function createDocument(
  _prevState: DocumentActionState,
  formData: FormData,
): Promise<DocumentActionState> {
  await requireAdmin()
  const fields = readDocumentFields(formData)

  if (!fields.title || !fields.category || !fields.color) {
    return { ok: false, error: 'Укажите название, раздел и цвет' }
  }

  const file = await readFile(formData)
  if (file.error) return { ok: false, error: file.error }

  const maxOrder = await db.document.aggregate({ _max: { order: true } })
  await db.document.create({
    data: { ...fields, fileUrl: file.url ?? null, order: (maxOrder._max.order ?? -1) + 1 },
  })

  revalidatePath('/admin')
  revalidatePath('/documents')
  return { ok: true }
}

export async function updateDocument(
  documentId: string,
  _prevState: DocumentActionState,
  formData: FormData,
): Promise<DocumentActionState> {
  await requireAdmin()
  const fields = readDocumentFields(formData)

  if (!fields.title || !fields.category || !fields.color) {
    return { ok: false, error: 'Укажите название, раздел и цвет' }
  }

  const file = await readFile(formData)
  if (file.error) return { ok: false, error: file.error }

  const existing = await db.document.findUnique({ where: { id: documentId } })
  await db.document.update({
    where: { id: documentId },
    data: { ...fields, ...(file.url ? { fileUrl: file.url } : {}) },
  })
  // Новый файл загружен взамен старого — старый больше ничем не используется.
  if (file.url && existing?.fileUrl) await deleteAssetsByUrls([existing.fileUrl])

  revalidatePath('/admin')
  revalidatePath('/documents')
  return { ok: true }
}

export async function deleteDocument(documentId: string): Promise<DocumentActionState> {
  await requireAdmin()

  const existing = await db.document.findUnique({ where: { id: documentId } })
  await db.document.delete({ where: { id: documentId } })
  if (existing?.fileUrl) await deleteAssetsByUrls([existing.fileUrl])

  revalidatePath('/admin')
  revalidatePath('/documents')
  return { ok: true }
}
