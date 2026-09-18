import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteBrand } from '@/components/site-brand'
import { ArrowUpRight, ArrowLeft, Check, Factory, ShieldCheck, Sparkles } from 'lucide-react'

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
    <main className="min-h-screen overflow-hidden bg-[#101417] text-white">
      <header className="border-b border-white/10 px-5 py-5 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between">
          <SiteBrand dark />
          <div className="flex items-center gap-5">
            <Link
              href="/catalog"
              className="hidden text-sm text-white/55 transition hover:text-[#c9ff3d] sm:block"
            >
              Каталог
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
            >
              <ArrowLeft size={15} /> На главную
            </Link>
          </div>
        </div>
      </header>

      <section className="relative isolate overflow-hidden px-5 pb-24 pt-20 lg:px-10 lg:pb-36 lg:pt-32">
        <img
          src="/hero-ladders.png"
          alt="Алюминиевая лестница в архитектурном пространстве"
          className="absolute inset-0 -z-20 size-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#101417_8%,rgba(16,20,23,.82)_48%,rgba(16,20,23,.2)),linear-gradient(0deg,#101417,transparent_65%)]" />
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#c9ff3d]">
            О компании
          </p>
          <h1 className="max-w-5xl text-[clamp(4rem,10vw,10rem)] font-medium leading-[.9] tracking-[-.04em]">
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
        </div>
      </section>

      <section className="bg-[#c9ff3d] px-5 py-20 text-[#101417] lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#52651c]">
              Как мы работаем
            </p>
            <h2 className="max-w-xl text-5xl font-medium leading-[.92] tracking-[-.04em] sm:text-8xl">
              Точная вещь
              <br />
              <span className="text-white">начинается здесь.</span>
            </h2>
          </div>
          <div className="grid gap-px bg-[#52651c]/30 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <article key={title} className="bg-[#c9ff3d] p-6">
                <Icon size={24} strokeWidth={1.5} />
                <h3 className="mt-14 text-xl font-semibold tracking-[-.04em]">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#52651c]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f1efe9] px-5 py-20 text-[#15171a] lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-[#6f792e]">
              Наш подход
            </p>
            <h2 className="max-w-2xl text-5xl font-medium leading-[.92] tracking-[-.04em] sm:text-8xl">
              Не продаём
              <br />
              <span className="text-[#858a87]">случайные решения.</span>
            </h2>
          </div>
          <div className="self-end text-lg leading-relaxed text-[#626566]">
            <p>
              Подбираем конструкцию под задачу, пространство и ритм работы. Поэтому в каталоге есть
              и компактные модели для дома, и серьёзные системы для производства.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-3 rounded-full bg-[#15171a] px-5 py-3 font-semibold text-white transition hover:bg-[#c9ff3d] hover:text-[#15171a]"
              >
                Смотреть каталог <ArrowUpRight size={16} />
              </Link>
              <Link
                href="/documents"
                className="inline-flex items-center gap-3 rounded-full border border-[#15171a]/20 px-5 py-3 font-semibold transition hover:border-[#15171a]"
              >
                Документы и сертификаты <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
