import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { DocumentsBrowser } from '@/components/documents-browser'
import { getAllDocuments } from '@/lib/documents'

// См. комментарий в app/page.tsx — читает БД, без force-dynamic не соберётся
// Docker-образ (на моменте `next build` ещё нет живой БД).
export const dynamic = 'force-dynamic'

export default async function DocumentsPage() {
  const documents = await getAllDocuments()

  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader
        links={[{ href: '/catalog', label: 'Каталог' }]}
        backHref="/"
        backLabel="На главную"
      />

      <section className="py-20 lg:py-28">
        <Container width="narrow">
          <SectionEyebrow className="mb-5 text-brand-muted">Документы и качество</SectionEyebrow>
          <h1 className="heading-1 max-w-4xl">
            Всё, что
            <br />
            <span className="text-brand-muted-faintest">подтверждает</span>
            <br />
            качество.
          </h1>

          <DocumentsBrowser documents={documents} />
        </Container>
      </section>

      <SiteFooter />
    </main>
  )
}
