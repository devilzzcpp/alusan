'use client'

import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ProductCard } from '@/components/product-card'
import { PillFilter } from '@/components/pill-filter'
import { ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { categories, products } from '@/lib/data/products'

const filterOptions = ['Все товары', ...categories.map((category) => category.title)] as const

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof filterOptions)[number]>('Все товары')
  const [query, setQuery] = useState('')
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (activeCategory === 'Все товары' || product.category === activeCategory) &&
          `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [activeCategory, query],
  )

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
              <SectionEyebrow className="mb-5 text-brand-muted">КАТАЛОГ ПРОДУКЦИИ</SectionEyebrow>
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
          <div className="mt-20 border-y border-brand-border py-5">
            <div className="flex items-center gap-3">
              <Search size={18} className="text-brand-muted-faintest" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Найти по названию или категории"
                className="w-full bg-transparent text-sm outline-none placeholder:text-brand-muted-faintest"
                aria-label="Поиск по каталогу"
              />
              <SlidersHorizontal size={17} className="text-brand-muted-faintest" />
            </div>
          </div>
          <div className="mt-5">
            <PillFilter
              options={filterOptions}
              active={activeCategory}
              onChange={setActiveCategory}
              nowrap
            />
          </div>
          <div className="mt-10 flex items-center justify-between">
            <p className="font-mono text-xs text-brand-muted-faintest">
              Показано: {filteredProducts.length} из {products.length}
            </p>
            <Link
              href="/contacts"
              className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] sm:flex"
            >
              Нужна консультация <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.name} product={product} variant="catalog" />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="border border-dashed border-brand-border-strong py-20 text-center text-sm text-brand-muted-dim">
              Ничего не нашли. Попробуйте другую категорию или название.
            </div>
          )}
          <div className="mt-24 grid gap-4 border-t border-brand-border pt-8 md:grid-cols-3">
            <div>
              <SectionEyebrow className="text-brand-muted">КАТАЛОГ</SectionEyebrow>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted-dim">
                Полный ассортимент, паспорта изделий и актуальные характеристики соберём в рабочей
                версии.
              </p>
            </div>
            <div>
              <SectionEyebrow className="text-brand-muted">СЕРТИФИКАТЫ</SectionEyebrow>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted-dim">
                Документы на продукцию и материалы будут доступны на странице каждой модели.
              </p>
            </div>
            <div>
              <SectionEyebrow className="text-brand-muted">НЕ НАШЛИ</SectionEyebrow>
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
