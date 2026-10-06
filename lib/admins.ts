import { db } from '@/lib/db'
import type { AdminRole } from '@prisma/client'

export type AdminSummary = {
  id: string
  email: string
  phone: string | null
  firstName: string | null
  lastName: string | null
  role: AdminRole
  createdAt: Date
}

export async function getAllAdmins(): Promise<AdminSummary[]> {
  return db.adminUser.findMany({
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      email: true,
      phone: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
    },
  })
}
