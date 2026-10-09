import { db } from '@/lib/db'

export type SiteSettings = {
  phone: string
  email: string
  city: string
  address: string
  legalName: string
  inn: string
}

const fallback: SiteSettings = {
  phone: '+7 777 777-77-77',
  email: 'hello@alusan.ru',
  city: 'Ростов-на-Дону',
  address: 'ул. Производственная, 7',
  legalName: '',
  inn: '',
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const settings = await db.siteSettings.findUnique({ where: { id: 'singleton' } })
  return settings ?? fallback
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, '')}`
}
