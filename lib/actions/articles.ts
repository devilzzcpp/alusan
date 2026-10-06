'use server'

import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'
import { getCurrentAdmin } from '@/lib/current-admin'
import { isUniqueConstraintError } from '@/lib/prisma-errors'
import type { ArticleStatus } from '@prisma/client'

export type ArticleActionState = { ok: boolean; error?: string }

async function requireAdmin() {
  const admin = await getCurrentAdmin()
  if (!admin) throw new Error('Unauthorized')
}

function readArticleFields(formData: FormData) {
  const status = String(formData.get('status') ?? 'draft') as ArticleStatus
  return {
    slug: String(formData.get('slug') ?? '').trim(),
    title: String(formData.get('title') ?? '').trim(),
    excerpt: String(formData.get('excerpt') ?? '').trim(),
    body: String(formData.get('body') ?? '').trim(),
    status,
  }
}

export async function createArticle(
  _prevState: ArticleActionState,
  formData: FormData,
): Promise<ArticleActionState> {
  await requireAdmin()
  const fields = readArticleFields(formData)

  if (!fields.slug || !fields.title || !fields.body) {
    return { ok: false, error: 'Укажите slug, заголовок и текст статьи' }
  }

  try {
    await db.article.create({
      data: { ...fields, publishedAt: fields.status === 'published' ? new Date() : null },
    })
  } catch (error) {
    if (isUniqueConstraintError(error, 'slug')) {
      return { ok: false, error: 'Статья с таким slug уже существует' }
    }
    throw error
  }

  revalidatePath('/admin')
  revalidatePath('/articles')
  revalidatePath(`/articles/${fields.slug}`)
  return { ok: true }
}

export async function updateArticle(
  articleId: string,
  _prevState: ArticleActionState,
  formData: FormData,
): Promise<ArticleActionState> {
  await requireAdmin()
  const fields = readArticleFields(formData)

  if (!fields.slug || !fields.title || !fields.body) {
    return { ok: false, error: 'Укажите slug, заголовок и текст статьи' }
  }

  const existing = await db.article.findUnique({ where: { id: articleId } })
  const publishedAt =
    fields.status === 'published' ? (existing?.publishedAt ?? new Date()) : existing?.publishedAt

  try {
    await db.article.update({ where: { id: articleId }, data: { ...fields, publishedAt } })
  } catch (error) {
    if (isUniqueConstraintError(error, 'slug')) {
      return { ok: false, error: 'Статья с таким slug уже существует' }
    }
    throw error
  }

  revalidatePath('/admin')
  revalidatePath('/articles')
  if (existing) revalidatePath(`/articles/${existing.slug}`)
  revalidatePath(`/articles/${fields.slug}`)
  return { ok: true }
}

export async function deleteArticle(articleId: string): Promise<ArticleActionState> {
  await requireAdmin()

  const existing = await db.article.findUnique({ where: { id: articleId } })
  await db.article.delete({ where: { id: articleId } })

  revalidatePath('/admin')
  revalidatePath('/articles')
  if (existing) revalidatePath(`/articles/${existing.slug}`)

  return { ok: true }
}
