import Link from 'next/link'
import { SiteBrand } from '@/components/site-brand'
import { ArrowLeft, ArrowUpRight, Check, Download } from 'lucide-react'

const categoryData: Record<string, { title: string; description: string; products: string[] }> = {
  lestnicy: {
    title: 'Лестницы',
    description: 'Приставные и раздвижные модели для дома, ремонта и профессиональных задач.',
    products: ['ЛМ-08', 'ЛМ-10', 'ЛМ-12'],
  },
  stremyanki: {
    title: 'Стремянки',
    description: 'Устойчивые стремянки для ежедневной работы на небольшой и средней высоте.',
    products: ['СМ-04', 'СМ-06', 'СМ-08'],
  },
  'sharnirnye-lestnicy': {
    title: 'Шарнирные лестницы',
    description: 'Трансформируемые конструкции с несколькими рабочими положениями.',
    products: ['Т4-3×4', 'Т4-3×5', 'Т4-4×4'],
  },
  'vyshki-tury': {
    title: 'Вышки-туры',
    description: 'Мобильные рабочие платформы для монтажа, отделки и обслуживания.',
    products: ['ВП-04', 'ВП-06', 'ВП-08'],
  },
  podmosti: {
    title: 'Подмости',
    description: 'Компактные рабочие места с устойчивой платформой и быстрым монтажом.',
    products: ['ПМ-06', 'ПМ-08', 'ПМ-10'],
  },
  accessories: {
    title: 'Аксессуары',
    description: 'Комплектующие, опоры и дополнительные элементы для лестничных систем.',
    products: ['Опоры', 'Поручни', 'Колёса'],
  },
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const data = categoryData[category] ?? categoryData.stremyanki
  return (
    <main className="min-h-screen bg-[#f4f3ef] text-[#15171a]">
      <header className="flex items-center justify-between border-b border-[#d8d8d2] px-5 py-5 lg:px-10">
        <SiteBrand />
        <Link
          href="/catalog"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#676b69]"
        >
          <ArrowLeft size={15} /> Весь каталог
        </Link>
      </header>
      <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32">
        <p className="mb-5 font-mono text-xs text-[#6f792e]">
          КАТАЛОГ / {data.title.toUpperCase()}
        </p>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <h1 className="text-7xl font-medium leading-[.84] tracking-[-0.09em] sm:text-9xl">
            {data.title}
          </h1>
          <p className="max-w-sm text-base leading-relaxed text-[#626566]">{data.description}</p>
        </div>
        <div className="mt-20 grid gap-3 border-t border-[#d8d8d2] pt-5 md:grid-cols-3">
          {data.products.map((product, index) => (
            <article
              key={product}
              className="group min-h-[360px] bg-gradient-to-br from-[#c7d3d2] via-[#eef1eb] to-[#84949a] p-5"
            >
              <div className="flex justify-between font-mono text-xs text-[#15171a]/55">
                <span>
                  {category.toUpperCase()} / 0{index + 1}
                </span>
                <ArrowUpRight size={18} />
              </div>
              <div className="mx-auto mt-12 h-44 w-24 rotate-[17deg] rounded-[45%] border-[5px] border-[#64747b]/60 bg-gradient-to-r from-white/70 via-[#84979c] to-white/70 shadow-xl transition group-hover:rotate-[24deg] group-hover:scale-105">
                <div className="mx-auto mt-12 h-1 w-4/5 bg-[#5b6b70]/70" />
                <div className="mx-auto mt-16 h-1 w-4/5 bg-[#5b6b70]/70" />
              </div>
              <h2 className="mt-8 text-3xl tracking-[-0.06em]">{product}</h2>
              <p className="mt-2 text-xs text-[#15171a]/60">Алюминий 6063 · паспорт изделия</p>
            </article>
          ))}
        </div>
        <div className="mt-14 grid gap-3 border-t border-[#d8d8d2] pt-8 sm:grid-cols-3">
          <div>
            <Check className="mb-4 text-[#849d26]" />
            <p className="text-sm">Сертифицированные материалы</p>
          </div>
          <div>
            <Check className="mb-4 text-[#849d26]" />
            <p className="text-sm">Гарантия на конструкцию</p>
          </div>
          <div>
            <Download className="mb-4 text-[#849d26]" />
            <p className="text-sm">Паспорт и инструкция в комплекте</p>
          </div>
        </div>
        <Link
          href="/contacts"
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#15171a] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white"
        >
          Запросить подбор <ArrowUpRight size={15} />
        </Link>
      </section>
    </main>
  )
}

export function generateStaticParams() {
  return Object.keys(categoryData).map((category) => ({ category }))
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  return { title: `${categoryData[category]?.title ?? 'Каталог'} — alusan` }
}

export const dynamicParams = false
