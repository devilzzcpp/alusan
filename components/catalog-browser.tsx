'use client'

import Link from 'next/link'
import { ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { PillFilter } from '@/components/pill-filter'
import type { Category, Product } from '@/lib/products'

export function CatalogBrowser({
  categories,
  products,
}: {
  categories: Category[]
  products: Product[]
}) {
  const filterOptions = useMemo(
    () => ['Все товары', ...categories.map((category) => category.title)] as const,
    [categories],
  )
  const [activeCategory, setActiveCategory] = useState<(typeof filterOptions)[number]>('Все товары')
  const [query, setQuery] = useState('')
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (activeCategory === 'Все товары' || product.category === activeCategory) &&
          `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [products, activeCategory, query],
  )

  return (
    <>
      <div className="mt-20 border-y border-brand-border py-5">
        <div className="flex items-center gap-3">
          <Search size={18} className="text-brand-muted-faintest" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Найти по названию или категории"
            className="w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted-faintest"
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
          <ProductCard key={product.id} product={product} variant="catalog" />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="border border-dashed border-brand-border-strong py-20 text-center text-sm text-brand-muted-dim">
          Ничего не нашли. Попробуйте другую категорию или название.
        </div>
      )}
    </>
  )
}
