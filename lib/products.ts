import { db } from '@/lib/db'

export type Product = {
  id: string
  slug: string
  code: string
  name: string
  category: string
  categorySlug: string
  description: string
  spec: string
  material: string
  tone: string
  images: string[]
  featured: boolean
}

export type Category = {
  id: string
  slug: string
  title: string
  description: string
  order: number
}

type ProductRow = {
  id: string
  slug: string
  code: string
  name: string
  description: string
  spec: string
  material: string
  tone: string
  images: string[]
  featured: boolean
  category: { title: string; slug: string }
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    code: row.code,
    name: row.name,
    category: row.category.title,
    categorySlug: row.category.slug,
    description: row.description,
    spec: row.spec,
    material: row.material,
    tone: row.tone,
    images: row.images,
    featured: row.featured,
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

// Для /admin — та же выборка, но с categoryId для формы редактирования
// (публичный Product намеренно сплющивает категорию до строки-названия).
export type AdminProduct = Product & { categoryId: string }

export async function getAllProductsForAdmin(): Promise<AdminProduct[]> {
  const rows = await db.product.findMany({
    include: { category: true },
    orderBy: { order: 'asc' },
  })
  return rows.map((row) => ({ ...toProduct(row), categoryId: row.categoryId }))
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  const rows = await db.product.findMany({
    where: { category: { slug } },
    include: { category: true },
    orderBy: { order: 'asc' },
  })
  return rows.map(toProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await db.product.findUnique({
    where: { slug },
    include: { category: true },
  })
  return row ? toProduct(row) : null
}

// Для тизера на главной — какие товары показывать, решает чекбокс "Показывать
// на главной" в админке (Product.featured), а не хардкод названий в коде.
export async function getFeaturedProducts(limit: number): Promise<Product[]> {
  const rows = await db.product.findMany({
    where: { featured: true },
    include: { category: true },
    orderBy: { order: 'asc' },
    take: limit,
  })
  return rows.map(toProduct)
}
