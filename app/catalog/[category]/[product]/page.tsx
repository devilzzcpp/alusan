import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ProductGallery } from '@/components/product-gallery'
import { ArrowUpRight } from 'lucide-react'
import { getCategoryBySlug, getProductBySlug } from '@/lib/products'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { category: categorySlug, product: productSlug } = await params
  const category = await getCategoryBySlug(categorySlug)
  const product = await getProductBySlug(productSlug)
  if (!category || !product || product.categorySlug !== categorySlug) notFound()

  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader backHref={`/catalog/${categorySlug}`} backLabel={category.title} />
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <ProductGallery images={product.images} tone={product.tone} name={product.name} />
            <div>
              <SectionEyebrow className="mb-5 text-brand-muted">
                {product.code} / {product.category}
              </SectionEyebrow>
              <h1 className="heading-1">{product.name}</h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-brand-muted-dim">
                {product.description}
              </p>
              <div className="mt-8 space-y-2 border-t border-brand-border pt-6 font-mono text-sm text-brand-muted">
                <p>{product.spec}</p>
                <p>{product.material}</p>
              </div>
              <Link
                href="/contacts"
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-brand-ink px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white transition hover:bg-brand-blue"
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

// Пустой список по той же причине, что и у /catalog/[category] — см. комментарий там.
export async function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>
}) {
  const { product: slug } = await params
  const product = await getProductBySlug(slug)
  return { title: product ? `${product.name} — alusan` : 'Товар — alusan' }
}

export const dynamicParams = true
