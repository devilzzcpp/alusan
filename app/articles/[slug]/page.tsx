import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/article-layout'
import { getArticleBySlug } from '@/lib/articles'

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  return <ArticleLayout article={article} />
}

// Пустой список: статьи редактируются из админки, список на момент сборки
// всё равно устареет. Страницы рендерятся по требованию при первом заходе
// (dynamicParams не выключен — см. соседний каталог) и дальше кешируются,
// обновляются через revalidatePath в lib/actions/articles.ts. Заодно это
// убирает обращение к БД во время `next build` — при сборке Docker-образа
// БД ещё не поднята, обращение к ней в сборке упало бы с ошибкой.
export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  return { title: article ? `${article.title} — АЛЮСАН` : 'Статья — АЛЮСАН' }
}
