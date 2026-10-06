import { db } from '@/lib/db'
import type { LeadStatus } from '@prisma/client'

export type Lead = {
  id: string
  name: string
  phone: string
  email: string | null
  comment: string | null
  source: string
  status: LeadStatus
  createdAt: Date
}

export async function getAllLeads(): Promise<Lead[]> {
  return db.lead.findMany({ orderBy: { createdAt: 'desc' } })
}
