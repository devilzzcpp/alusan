import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { getPublishedArticles } from '@/lib/articles'

// См. комментарий в app/page.tsx — читает БД, без force-dynamic не соберётся
// Docker-образ (на моменте `next build` ещё нет живой БД).
export const dynamic = 'force-dynamic'

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export const metadata = { title: 'Статьи — АЛЮСАН' }

export default async function ArticlesPage() {
  const articles = await getPublishedArticles()

  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader backHref="/" backLabel="На главную" />
      <section className="py-24 lg:py-32">
        <Container width="narrow">
          <SectionEyebrow className="mb-5 text-brand-muted">Статьи</SectionEyebrow>
          <h1 className="heading-1 max-w-3xl">
            Как выбрать
            <br />
            <span className="text-brand-muted-faintest">и не ошибиться.</span>
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-brand-muted-dim">
            Разбираем, как подобрать высоту, материал и тип конструкции под конкретную задачу.
          </p>

          <div className="mt-16 grid gap-4 border-t border-brand-border pt-10 md:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="group border border-brand-border bg-white p-6 transition hover:border-brand-ink"
              >
                <p className="font-mono text-xs text-brand-muted-faintest">
                  {dateFormatter.format(article.publishedAt)}
                </p>
                <h2 className="mt-4 text-xl tracking-[-0.03em]">{article.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted-dim">
                  {article.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-brand-blue">
                  Читать
                  <ArrowUpRight
                    size={14}
                    className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <SiteFooter />
    </main>
  )
}
