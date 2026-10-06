import { db } from '@/lib/db'
import type { ArticleStatus } from '@prisma/client'

export type ArticleSummary = {
  slug: string
  title: string
  excerpt: string
  publishedAt: Date
}

export type Article = ArticleSummary & {
  body: string
}

export async function getPublishedArticles(): Promise<ArticleSummary[]> {
  return db.article.findMany({
    where: { status: 'published' },
    select: { slug: true, title: true, excerpt: true, publishedAt: true },
    orderBy: { publishedAt: 'desc' },
  }) as Promise<ArticleSummary[]>
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = await db.article.findFirst({
    where: { slug, status: 'published' },
  })
  if (!article || !article.publishedAt) return null
  return {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    body: article.body,
    publishedAt: article.publishedAt,
  }
}

// Для /admin — все статьи (включая draft), с полями для формы редактирования.
export type AdminArticle = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  status: ArticleStatus
  publishedAt: Date | null
  updatedAt: Date
}

export async function getAllArticlesForAdmin(): Promise<AdminArticle[]> {
  return db.article.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      body: true,
      status: true,
      publishedAt: true,
      updatedAt: true,
    },
  })
}
