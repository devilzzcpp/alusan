import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ArrowUpRight } from 'lucide-react'

const offers = [
  {
    title: 'Оптовые поставки',
    description:
      'Отгружаем крупным и мелким оптом — от одной паллеты до вагонной партии. Гибкие условия по объёму и срокам.',
  },
  {
    title: 'Дилерская сеть',
    description:
      'Открываем дилерские представительства в регионах — особые цены, маркетинговая поддержка и закреплённая территория.',
  },
  {
    title: 'Проекты для бизнеса',
    description:
      'Подбираем и дорабатываем конструкции под нестандартные задачи — от разовой закупки до комплексного оснащения объекта.',
  },
]

// Сам текст на странице хардкод, но рендерится <SiteFooter /> (он читает
// настройки сайта из БД) — тот же build-time-без-БД нюанс, см. app/page.tsx.
export const dynamic = 'force-dynamic'

export default function CooperationPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader backHref="/" backLabel="На главную" />
      <section className="py-24 lg:py-32">
        <Container width="narrow">
          <SectionEyebrow className="mb-5 text-brand-muted">Сотрудничество</SectionEyebrow>
          <h1 className="heading-1 max-w-5xl">
            Растём
            <br />
            <span className="text-brand-muted-faintest">вместе.</span>
          </h1>
          <div className="mt-20 grid gap-5 md:grid-cols-3">
            {offers.map((item, i) => (
              <div key={item.title} className="border border-brand-border p-6">
                <span className="font-mono text-xs text-brand-blue">0{i + 1}</span>
                <h2 className="mt-20 text-2xl tracking-[-.05em]">{item.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted-dim">
                  {item.description}
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
