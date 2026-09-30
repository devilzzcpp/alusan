import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ArrowUpRight, Factory, ShieldCheck, Sparkles } from 'lucide-react'

const values = [
  {
    icon: Factory,
    title: 'Производим сами',
    text: 'Контролируем путь изделия от листа алюминия до готовой лестницы.',
  },
  {
    icon: ShieldCheck,
    title: 'Держим качество',
    text: 'Проверяем соединения, геометрию и устойчивость каждой серии.',
  },
  {
    icon: Sparkles,
    title: 'Думаем о форме',
    text: 'Создаём вещи, которые не хочется прятать в кладовой.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-brand-surface-1 text-white">
      <SiteHeader
        variant="dark"
        links={[{ href: '/catalog', label: 'Каталог' }]}
        backHref="/"
        backLabel="На главную"
      />

      <section className="relative isolate overflow-hidden pb-24 pt-20 lg:pb-36 lg:pt-32">
        <img
          src="/hero-ladders.png"
          alt="Алюминиевая лестница в архитектурном пространстве"
          className="absolute inset-0 -z-20 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#12181f_8%,rgba(18,24,31,.82)_48%,rgba(18,24,31,.2)),linear-gradient(0deg,#12181f,transparent_65%)]" />
        <Container>
          <SectionEyebrow className="mb-8 text-brand-lime">О компании</SectionEyebrow>
          <h1 className="max-w-5xl text-[clamp(3.5rem,7vw,6.5rem)] leading-[.9] tracking-[-.04em]">
            Высота
            <br />
            <span className="text-white/35">с характером.</span>
          </h1>
          <div className="mt-14 grid max-w-4xl gap-8 border-t border-white/20 pt-6 md:grid-cols-[1fr_.7fr]">
            <p className="text-2xl leading-tight text-white/90">
              alusan делает лестницы, которые выдерживают работу и выглядят как часть современной
              архитектуры.
            </p>
            <p className="text-sm leading-relaxed text-white/45">
              Мы соединяем производственную дисциплину, честные материалы и внимание к деталям. Без
              лишнего шума — только точная вещь.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-brand-blue-dark py-20 text-white lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionEyebrow className="mb-5 text-brand-lime">Как мы работаем</SectionEyebrow>
            <h2 className="heading-2 max-w-xl">
              Точная вещь
              <br />
              <span className="text-brand-lime">начинается здесь.</span>
            </h2>
          </div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-brand-blue-dark p-6">
                <Icon size={24} strokeWidth={1.5} />
                <h3 className="mt-14 text-xl font-semibold tracking-[-.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-brand-paper-alt py-20 text-brand-ink lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <SectionEyebrow className="mb-5 text-brand-muted">Наш подход</SectionEyebrow>
            <h2 className="heading-2 max-w-2xl">
              Не продаём
              <br />
              <span className="text-brand-muted-faintest">случайные решения.</span>
            </h2>
          </div>
          <div className="self-end text-lg leading-relaxed text-brand-muted-dim">
            <p>
              Подбираем конструкцию под задачу, пространство и ритм работы. Поэтому в каталоге есть
              и компактные модели для дома, и серьёзные системы для производства.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-3 rounded-full bg-brand-ink px-5 py-3 font-semibold text-white transition hover:bg-brand-lime hover:text-brand-ink"
              >
                Смотреть каталог <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/documents"
                className="inline-flex items-center gap-3 rounded-full border border-brand-ink/20 px-5 py-3 font-semibold transition hover:border-brand-ink"
              >
                Документы и сертификаты <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  )
}
