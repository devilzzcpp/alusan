'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/current-admin'
import { saveAsset, MAX_IMAGE_BYTES, deleteAssetsByUrls } from '@/lib/assets'
import { isUniqueConstraintError } from '@/lib/prisma-errors'

export type ProductActionState = { ok: boolean; error?: string }

async function requireAdmin() {
  const admin = await getCurrentAdmin()
  if (!admin) throw new Error('Unauthorized')
}

function readProductFields(formData: FormData) {
  return {
    slug: String(formData.get('slug') ?? '').trim(),
    code: String(formData.get('code') ?? '').trim(),
    name: String(formData.get('name') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    spec: String(formData.get('spec') ?? '').trim(),
    material: String(formData.get('material') ?? '').trim(),
    tone: String(formData.get('tone') ?? '').trim(),
    categoryId: String(formData.get('categoryId') ?? '').trim(),
  }
}

// Можно выбрать несколько файлов сразу — они ДОБАВЛЯЮТСЯ к уже загруженным
// фото (не заменяют), удаление отдельных фото — через removeProductImage.
async function readImages(formData: FormData): Promise<{ urls: string[]; error?: string }> {
  const files = formData
    .getAll('images')
    .filter((file): file is File => file instanceof File && file.size > 0)
  const urls: string[] = []
  for (const file of files) {
    const result = await saveAsset(file, MAX_IMAGE_BYTES)
    if (!result.url) return { urls, error: result.error }
    urls.push(result.url)
  }
  return { urls }
}

async function categorySlug(categoryId: string) {
  const category = await db.category.findUnique({ where: { id: categoryId } })
  return category?.slug
}

export async function createProduct(
  _prevState: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  await requireAdmin()
  const fields = readProductFields(formData)

  if (!fields.slug || !fields.code || !fields.name || !fields.categoryId) {
    return { ok: false, error: 'Укажите slug, артикул, название и категорию' }
  }

  const images = await readImages(formData)
  if (images.error) return { ok: false, error: images.error }

  const maxOrder = await db.product.aggregate({
    _max: { order: true },
    where: { categoryId: fields.categoryId },
  })

  try {
    await db.product.create({
      data: { ...fields, images: images.urls, order: (maxOrder._max.order ?? -1) + 1 },
    })
  } catch (error) {
    if (isUniqueConstraintError(error, 'slug')) {
      return { ok: false, error: 'Товар с таким slug уже существует' }
    }
    throw error
  }

  revalidatePath('/admin')
  revalidatePath('/')
  revalidatePath('/catalog')
  const slug = await categorySlug(fields.categoryId)
  if (slug) revalidatePath(`/catalog/${slug}`)
  revalidatePath(`/catalog/${slug}/${fields.slug}`)

  return { ok: true }
}

export async function updateProduct(
  productId: string,
  _prevState: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  await requireAdmin()
  const fields = readProductFields(formData)

  if (!fields.slug || !fields.code || !fields.name || !fields.categoryId) {
    return { ok: false, error: 'Укажите slug, артикул, название и категорию' }
  }

  const images = await readImages(formData)
  if (images.error) return { ok: false, error: images.error }

  const existing = await db.product.findUnique({ where: { id: productId } })
  if (!existing) return { ok: false, error: 'Товар не найден' }

  try {
    await db.product.update({
      where: { id: productId },
      data: { ...fields, images: [...existing.images, ...images.urls] },
    })
  } catch (error) {
    if (isUniqueConstraintError(error, 'slug')) {
      return { ok: false, error: 'Товар с таким slug уже существует' }
    }
    throw error
  }

  revalidatePath('/admin')
  revalidatePath('/')
  revalidatePath('/catalog')
  const newSlug = await categorySlug(fields.categoryId)
  if (newSlug) {
    revalidatePath(`/catalog/${newSlug}`)
    revalidatePath(`/catalog/${newSlug}/${fields.slug}`)
  }
  if (existing.categoryId !== fields.categoryId) {
    const oldSlug = await categorySlug(existing.categoryId)
    if (oldSlug) revalidatePath(`/catalog/${oldSlug}`)
  }

  return { ok: true }
}

export async function removeProductImage(
  productId: string,
  imageUrl: string,
): Promise<ProductActionState> {
  await requireAdmin()

  const product = await db.product.findUnique({ where: { id: productId } })
  if (!product) return { ok: false, error: 'Товар не найден' }

  await db.product.update({
    where: { id: productId },
    data: { images: product.images.filter((url) => url !== imageUrl) },
  })

  await deleteAssetsByUrls([imageUrl])

  revalidatePath('/admin')
  revalidatePath('/')
  revalidatePath('/catalog')

  return { ok: true }
}

export async function deleteProduct(productId: string): Promise<ProductActionState> {
  await requireAdmin()

  const existing = await db.product.findUnique({ where: { id: productId } })
  await db.product.delete({ where: { id: productId } })
  if (existing) await deleteAssetsByUrls(existing.images)

  revalidatePath('/admin')
  revalidatePath('/')
  revalidatePath('/catalog')
  if (existing) {
    const slug = await categorySlug(existing.categoryId)
    if (slug) revalidatePath(`/catalog/${slug}`)
  }

  return { ok: true }
}
