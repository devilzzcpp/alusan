'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/current-admin'
import { isUniqueConstraintError } from '@/lib/prisma-errors'

export type CategoryActionState = { ok: boolean; error?: string }

async function requireAdmin() {
  const admin = await getCurrentAdmin()
  if (!admin) throw new Error('Unauthorized')
}

function readCategoryFields(formData: FormData) {
  const order = Number(formData.get('order') ?? 0)
  return {
    slug: String(formData.get('slug') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    order: Number.isFinite(order) ? order : 0,
  }
}

export async function createCategory(
  _prevState: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  await requireAdmin()
  const fields = readCategoryFields(formData)

  if (!fields.slug || !fields.title) {
    return { ok: false, error: 'Укажите slug и название' }
  }

  try {
    await db.category.create({ data: fields })
  } catch (error) {
    if (isUniqueConstraintError(error, 'slug')) {
      return { ok: false, error: 'Категория с таким slug уже существует' }
    }
    throw error
  }

  revalidatePath('/admin')
  revalidatePath('/catalog')
  revalidatePath(`/catalog/${fields.slug}`)
  return { ok: true }
}

export async function updateCategory(
  categoryId: string,
  _prevState: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  await requireAdmin()
  const fields = readCategoryFields(formData)

  if (!fields.slug || !fields.title) {
    return { ok: false, error: 'Укажите slug и название' }
  }

  try {
    await db.category.update({ where: { id: categoryId }, data: fields })
  } catch (error) {
    if (isUniqueConstraintError(error, 'slug')) {
      return { ok: false, error: 'Категория с таким slug уже существует' }
    }
    throw error
  }

  revalidatePath('/admin')
  revalidatePath('/catalog')
  revalidatePath(`/catalog/${fields.slug}`)
  return { ok: true }
}

export async function deleteCategory(categoryId: string): Promise<CategoryActionState> {
  await requireAdmin()

  const productsCount = await db.product.count({ where: { categoryId } })
  if (productsCount > 0) {
    return {
      ok: false,
      error: `В категории ещё ${productsCount} товар(ов) — сначала удалите или перенесите их`,
    }
  }

  await db.category.delete({ where: { id: categoryId } })
  revalidatePath('/admin')
  revalidatePath('/catalog')
  return { ok: true }
}
