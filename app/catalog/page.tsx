import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { CatalogBrowser } from '@/components/catalog-browser'
import { ArrowUpRight } from 'lucide-react'
import { getAllProducts, getCategories } from '@/lib/products'

// См. комментарий в app/page.tsx — читает БД, без force-dynamic не соберётся
// Docker-образ (на моменте `next build` ещё нет живой БД).
export const dynamic = 'force-dynamic'

export default async function CatalogPage() {
  const [categories, products] = await Promise.all([getCategories(), getAllProducts()])

  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader
        links={[
          { href: '/documents', label: 'Документы' },
          { href: '/contacts', label: 'Контакты' },
        ]}
        backHref="/"
        backLabel="На главную"
      />
      <section className="py-24 lg:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div>
              <SectionEyebrow className="mb-5 text-brand-muted">Каталог продукции</SectionEyebrow>
              <h1 className="heading-1 max-w-4xl">
                Подберите
                <br />
                <span className="text-brand-muted-faintest">свою высоту.</span>
              </h1>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-brand-muted-dim">
              Лестницы, стремянки, вышки-туры и подмости для дома, бизнеса и профессиональных задач.
            </p>
          </div>

          <CatalogBrowser categories={categories} products={products} />

          <div className="mt-24 grid gap-4 border-t border-brand-border pt-8 md:grid-cols-3">
            <div>
              <SectionEyebrow className="text-brand-muted">Каталог</SectionEyebrow>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted-dim">
                Полный ассортимент, паспорта изделий и актуальные характеристики соберём в рабочей
                версии.
              </p>
            </div>
            <div>
              <SectionEyebrow className="text-brand-muted">Сертификаты</SectionEyebrow>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted-dim">
                Документы на продукцию и материалы будут доступны на странице каждой модели.
              </p>
            </div>
            <div>
              <SectionEyebrow className="text-brand-muted">Не нашли? </SectionEyebrow>
              <Link
                href="/contacts"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Запросить подбор <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
