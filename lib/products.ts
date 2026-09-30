import { db } from '@/lib/db'

export type Product = {
  id: string
  code: string
  name: string
  category: string
  description: string
  spec: string
  material: string
  tone: string
}

export type Category = {
  id: string
  slug: string
  title: string
  description: string
}

type ProductRow = {
  id: string
  code: string
  name: string
  description: string
  spec: string
  material: string
  tone: string
  category: { title: string }
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    category: row.category.title,
    description: row.description,
    spec: row.spec,
    material: row.material,
    tone: row.tone,
  }
}

export async function getCategories(): Promise<Category[]> {
  return db.category.findMany({ orderBy: { order: 'asc' } })
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return db.category.findUnique({ where: { slug } })
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await db.product.findMany({
    include: { category: true },
    orderBy: { order: 'asc' },
  })
  return rows.map(toProduct)
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  const rows = await db.product.findMany({
    where: { category: { slug } },
    include: { category: true },
    orderBy: { order: 'asc' },
  })
  return rows.map(toProduct)
}

export async function getProductsByNames(names: string[]): Promise<Product[]> {
  const rows = await db.product.findMany({
    where: { name: { in: names } },
    include: { category: true },
  })
  const byName = new Map(rows.map((row) => [row.name, toProduct(row)]))
  return names.map((name) => byName.get(name)).filter((product): product is Product => !!product)
}
