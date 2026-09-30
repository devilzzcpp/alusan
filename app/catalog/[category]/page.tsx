import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ProductCard } from '@/components/product-card'
import { ArrowUpRight, Check, Download } from 'lucide-react'
import { getCategories, getCategoryBySlug, getProductsByCategorySlug } from '@/lib/products'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) notFound()
  const categoryProducts = await getProductsByCategorySlug(slug)

  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader backHref="/catalog" backLabel="Весь каталог" />
      <section className="py-24 lg:py-32">
        <Container>
          <SectionEyebrow className="mb-5 text-brand-muted">
            КАТАЛОГ / {category.title.toUpperCase()}
          </SectionEyebrow>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <h1 className="heading-1">{category.title}</h1>
            <p className="max-w-sm text-base leading-relaxed text-brand-muted-dim">
              {category.description}
            </p>
          </div>
          <div className="mt-20 grid gap-3 border-t border-brand-border pt-5 md:grid-cols-3">
            {categoryProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="category"
                label={`${slug.toUpperCase()} / 0${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-14 grid gap-3 border-t border-brand-border pt-8 sm:grid-cols-3">
            <div>
              <Check className="mb-4 text-brand-lime-ink" />
              <p className="text-sm">Сертифицированные материалы</p>
            </div>
            <div>
              <Check className="mb-4 text-brand-lime-ink" />
              <p className="text-sm">Гарантия на конструкцию</p>
            </div>
            <div>
              <Download className="mb-4 text-brand-lime-ink" />
              <p className="text-sm">Паспорт и инструкция в комплекте</p>
            </div>
          </div>
          <Link
            href="/contacts"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-brand-ink px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white"
          >
            Запросить подбор <ArrowUpRight size={15} />
          </Link>
        </Container>
      </section>
    </main>
  )
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params
  const category = await getCategoryBySlug(slug)
  return { title: `${category?.title ?? 'Каталог'} — alusan` }
}

export const dynamicParams = false
