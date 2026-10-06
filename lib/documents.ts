import { db } from '@/lib/db'

// Фиксированный набор вкладок на /documents — их немного и они не
// самостоятельная сущность с URL (см. комментарий в prisma/schema.prisma).
export const DOCUMENT_CATEGORIES = ['Сертификаты', 'Паспорта', 'Документация'] as const

export type Document = {
  id: string
  title: string
  subtitle: string
  category: string
  code: string
  color: string
  fileUrl: string | null
}

export async function getAllDocuments(): Promise<Document[]> {
  return db.document.findMany({ orderBy: { order: 'asc' } })
}
