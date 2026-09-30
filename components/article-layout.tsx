import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowUpRight } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import type { Article } from '@/lib/articles'

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function ArticleLayout({ article }: { article: Article }) {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader
        links={[{ href: '/articles', label: 'Статьи' }]}
        backHref="/articles"
        backLabel="Все статьи"
      />
      <article className="py-20 lg:py-28">
        <Container width="narrow">
          <SectionEyebrow className="mb-5 text-brand-muted">
            {dateFormatter.format(article.publishedAt)}
          </SectionEyebrow>
          <h1 className="heading-1 max-w-3xl">{article.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted-dim">
            {article.excerpt}
          </p>
          <div className="mt-14 max-w-3xl border-t border-brand-border pt-10">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: (props) => (
                  <h2 className="mt-12 text-2xl tracking-[-0.03em] first:mt-0" {...props} />
                ),
                p: (props) => (
                  <p className="mt-4 text-base leading-relaxed text-brand-muted-dim" {...props} />
                ),
                table: (props) => (
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full border-collapse text-sm" {...props} />
                  </div>
                ),
                thead: (props) => (
                  <thead
                    className="border-b border-brand-border text-left font-mono text-xs uppercase tracking-[0.1em] text-brand-muted-faintest"
                    {...props}
                  />
                ),
                th: (props) => <th className="px-3 py-2" {...props} />,
                td: (props) => (
                  <td
                    className="border-b border-brand-border px-3 py-2 text-brand-muted-dim"
                    {...props}
                  />
                ),
              }}
            >
              {article.body}
            </ReactMarkdown>
          </div>
          <Link
            href="/contacts"
            className="mt-14 inline-flex items-center gap-3 rounded-full bg-brand-ink px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white"
          >
            Нужна консультация <ArrowUpRight size={15} />
          </Link>
        </Container>
      </article>
      <SiteFooter />
    </main>
  )
}
