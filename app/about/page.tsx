import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ArrowUpRight } from 'lucide-react'

const advantages = [
  {
    title: 'Свежий взгляд на привычные вещи',
    text: 'Мы не копируем старые решения, а проектируем продукцию с учётом современных требований к удобству, безопасности и эргономике.',
  },
  {
    title: 'Технологичность',
    text: 'Производство на автоматизированном оборудовании и строгий контроль на каждом этапе — это гарантия надёжности.',
  },
  {
    title: 'Гибкость и скорость',
    text: 'Большие склады и отлаженные процессы позволяют отгружать любые объёмы в сжатые сроки.',
  },
  {
    title: 'Широкий выбор',
    text: 'Более 100 моделей: от простых бытовых до профессиональных решений.',
  },
  {
    title: 'Партнёрский подход',
    text: 'Мы выстраиваем долгосрочные отношения и учитываем специфику задач каждого клиента.',
  },
  {
    title: 'Подтверждённое качество',
    text: 'Продукция регулярно проходит лабораторные испытания, результаты подтверждены сертификатами добровольной сертификации.',
  },
  {
    title: 'Поддержка партнёров',
    text: 'Предоставляем контент для сайтов, каталоги, помогаем с локальной рекламой и участвуем в совместных акциях.',
  },
]

// Сам текст на странице хардкод, но рендерится <SiteFooter /> (он читает
// настройки сайта из БД) — тот же build-time-без-БД нюанс, см. app/page.tsx.
export const dynamic = 'force-dynamic'

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
          src="/hero-ladders.jpg"
          alt="Алюминиевая лестница в архитектурном пространстве"
          className="absolute inset-0 -z-20 size-full object-cover object-[80%_center] opacity-30"
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
              ООО «АЛЮСАН» — современное предприятие, которое создаёт лестничную технику с учётом
              актуальных задач пользователей. Мы выпускаем алюминиевые и стальные стремянки,
              лестницы, вышки-туры и подмости — для бытового и профессионального применения.
            </p>
            <p className="text-sm leading-relaxed text-white/45">
              Производство построено вокруг автоматизации: это позволяет быстро реагировать на
              запросы рынка и держать стабильное качество. Мы тщательно контролируем сырьё и
              комплектующие, а также проверяем готовую продукцию на соответствие нормативам.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-brand-blue-dark py-20 text-white lg:py-28">
        <Container>
          <div className="mb-12">
            <SectionEyebrow className="mb-5 text-brand-lime">Ключевые преимущества</SectionEyebrow>
            <h2 className="heading-2 max-w-xl">
              Почему
              <br />
              <span className="text-brand-lime">выбирают нас.</span>
            </h2>
          </div>
          <div className="grid gap-px bg-white/15 sm:grid-cols-2">
            {advantages.map((advantage, index) => (
              <article
                key={advantage.title}
                className={`bg-brand-blue-dark p-6 ${
                  index === advantages.length - 1 && advantages.length % 2 === 1
                    ? 'sm:col-span-2'
                    : ''
                }`}
              >
                <span className="font-mono text-xs text-brand-lime">0{index + 1}</span>
                <h3 className="mt-10 text-xl font-semibold tracking-[-.04em]">{advantage.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-white/70">{advantage.text}</p>
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
            <p className="mt-4">
              Большой складской запас помогает отгружать заказы оперативно — в любом объёме и
              ассортименте. Мы активно развиваем дилерскую сеть по России и за рубежом и
              ориентируемся на реальные потребности клиентов.
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
