import { cookies } from 'next/headers'
import { db } from '@/lib/db'
import { verifySessionToken, SESSION_COOKIE } from '@/lib/auth'

export type CurrentAdmin = {
  id: string
  email: string
  phone: string | null
  firstName: string | null
  lastName: string | null
  role: 'owner' | 'manager'
}

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  const adminId = token ? await verifySessionToken(token) : null
  if (!adminId) return null

  return db.adminUser.findUnique({
    where: { id: adminId },
    select: { id: true, email: true, phone: true, firstName: true, lastName: true, role: true },
  })
}
