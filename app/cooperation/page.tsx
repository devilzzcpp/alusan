import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ArrowUpRight } from 'lucide-react'

const offers = ['Оптовые поставки', 'Дилерская сеть', 'Проекты для бизнеса']

export default function CooperationPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader backHref="/" backLabel="На главную" />
      <section className="py-24 lg:py-32">
        <Container width="narrow">
          <SectionEyebrow className="mb-5 text-brand-muted">СОТРУДНИЧЕСТВО</SectionEyebrow>
          <h1 className="heading-1 max-w-5xl">
            Растём
            <br />
            <span className="text-brand-muted-faintest">вместе.</span>
          </h1>
          <div className="mt-20 grid gap-5 md:grid-cols-3">
            {offers.map((item, i) => (
              <div key={item} className="border border-brand-border p-6">
                <span className="font-mono text-xs text-brand-blue">0{i + 1}</span>
                <h2 className="mt-20 text-2xl tracking-[-.05em]">{item}</h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted-dim">
                  Подберём ассортимент, условия и логистику под задачи вашей компании.
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/contacts"
            className="mt-12 inline-flex items-center gap-3 rounded-full bg-brand-lime px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-brand-ink"
          >
            Обсудить условия <ArrowUpRight size={15} />
          </Link>
        </Container>
      </section>
      <SiteFooter />
    </main>
  )
}
