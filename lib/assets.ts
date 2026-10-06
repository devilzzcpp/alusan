import { db } from '@/lib/db'

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 МБ — фото товара
export const MAX_DOCUMENT_BYTES = 15 * 1024 * 1024 // 15 МБ — скан/PDF документа

type SaveAssetResult = { url: string; error?: undefined } | { url?: undefined; error: string }

export async function saveAsset(file: File, maxBytes: number): Promise<SaveAssetResult> {
  if (file.size > maxBytes) {
    return { error: `Файл слишком большой (максимум ${Math.round(maxBytes / 1024 / 1024)} МБ)` }
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const asset = await db.asset.create({
    data: {
      filename: file.name,
      mimeType: file.type || 'application/octet-stream',
      data: buffer,
      size: file.size,
    },
  })

  return { url: `/api/assets/${asset.id}` }
}

// Ссылка вида /api/assets/<id> — вытащить id, чтобы удалить сам Asset и не
// оставлять "осиротевший" файл в БД, когда товар/документ (или фото в нём)
// удаляют или заменяют.
export function assetIdFromUrl(url: string): string | null {
  const match = url.match(/^\/api\/assets\/([^/]+)$/)
  return match ? match[1] : null
}

export async function deleteAssetsByUrls(urls: string[]) {
  const ids = urls.map(assetIdFromUrl).filter((id): id is string => id !== null)
  if (ids.length === 0) return
  await db.asset.deleteMany({ where: { id: { in: ids } } })
}
