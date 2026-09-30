import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ArrowUpRight } from 'lucide-react'

const specs = [
  { label: '01 / PRECISION', value: '0.8', unit: 'mm', caption: 'точность соединения' },
  { label: '02 / MATERIAL', value: 'AL', unit: '6063', caption: 'алюминиевый профиль' },
  { label: '03 / CONTROL', value: '100', unit: '%', caption: 'контроль каждого изделия' },
]

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader backHref="/" backLabel="На главную" />
      <section className="py-24 lg:py-36">
        <Container>
          <SectionEyebrow className="mb-5 text-brand-muted">02 / СИСТЕМА</SectionEyebrow>
          <h1 className="heading-1 max-w-5xl">
            Инженерия,
            <br />
            <span className="text-brand-muted-faintest">которую видно.</span>
          </h1>
          <div className="mt-24 grid gap-px bg-brand-border sm:grid-cols-3">
            {specs.map((spec) => (
              <div key={spec.label} className="border border-brand-border bg-white p-7">
                <p className="font-mono text-xs text-brand-muted-faintest">{spec.label}</p>
                <p className="mt-20 text-6xl tracking-[-0.08em]">
                  {spec.value}
                  <span className="text-brand-blue">{spec.unit}</span>
                </p>
                <p className="mt-3 text-sm text-brand-muted-dim">{spec.caption}</p>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            className="mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-brand-blue"
          >
            Узнать о компании <ArrowUpRight size={16} />
          </Link>
        </Container>
      </section>
      <SiteFooter />
    </main>
  )
}
