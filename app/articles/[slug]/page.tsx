import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/article-layout'
import { getArticleBySlug, getPublishedArticleSlugs } from '@/lib/articles'

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  return <ArticleLayout article={article} />
}

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  return { title: article ? `${article.title} — АЛЮСАН` : 'Статья — АЛЮСАН' }
}
