import { db } from '@/lib/db'

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

export async function getPublishedArticleSlugs(): Promise<string[]> {
  const rows = await db.article.findMany({
    where: { status: 'published' },
    select: { slug: true },
  })
  return rows.map((row) => row.slug)
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
