'use client'

import Link from 'next/link'
import { SiteBrand } from '@/components/site-brand'
import { ArrowUpRight, ChevronLeft, Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'

const categories = [
  'Все товары',
  'Лестницы',
  'Стремянки',
  'Шарнирные лестницы',
  'Вышки-туры',
  'Подмости',
  'Аксессуары',
]

const products = [
  {
    code: 'Бытовая серия',
    name: 'Стремянка компактная',
    category: 'Стремянки',
    description: 'Компактная бытовая модель для дома и мастерской',
    spec: 'Четыре ступени · высота один метр двадцать сантиметров',
    material: 'Алюминий 6063 · 1.5 мм',
    tone: 'from-[#b9cdd3] via-[#f2f4f1] to-[#7e929b]',
  },
  {
    code: 'Бытовая серия',
    name: 'Стремянка высокая',
    category: 'Стремянки',
    description: 'Устойчивая высота для ежедневных задач',
    spec: 'Семь ступеней · высота один метр девяносто сантиметров',
    material: 'Алюминий 6063 · 1.5 мм',
    tone: 'from-[#d5d0c4] via-[#f6f2e9] to-[#968d7e]',
  },
  {
    code: 'Приставная серия',
    name: 'Лестница приставная',
    category: 'Лестницы',
    description: 'Приставная лестница для дома и бизнеса',
    spec: 'Восемь ступеней · высота два метра сорок сантиметров',
    material: 'Алюминий 6063 · 2.0 мм',
    tone: 'from-[#aebcc7] via-[#e9edf0] to-[#748494]',
  },
  {
    code: 'Шарнирная серия',
    name: 'Лестница трансформер',
    category: 'Шарнирные лестницы',
    description: 'Четыре рабочих положения в одной системе',
    spec: 'Три секции · высота до пяти метров',
    material: 'Алюминий 6063 · 2.0 мм',
    tone: 'from-[#c5d7dc] via-[#eef3f2] to-[#879ba4]',
  },
  {
    code: 'Профессиональная серия',
    name: 'Вышка мобильная',
    category: 'Вышки-туры',
    description: 'Мобильная рабочая платформа с колёсами',
    spec: 'Высота четыре метра · рабочая платформа',
    material: 'Алюминий 6063 · 2.5 мм',
    tone: 'from-[#b7b5ae] via-[#e7e6df] to-[#85877f]',
  },
  {
    code: 'Рабочая серия',
    name: 'Подмости рабочие',
    category: 'Подмости',
    description: 'Рабочее место для отделочных и монтажных работ',
    spec: 'Высота один метр восемьдесят сантиметров · высокая нагрузка',
    material: 'Алюминий 6063 · 2.5 мм',
    tone: 'from-[#bac8c3] via-[#eff2eb] to-[#778c82]',
  },
]

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('Все товары')
  const [query, setQuery] = useState('')
  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (activeCategory === 'Все товары' || product.category === activeCategory) &&
          `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [activeCategory, query],
  )

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-[#15171a]">
      <header className="flex items-center justify-between border-b border-[#d8d8d2] px-5 py-5 lg:px-10">
        <SiteBrand />
        <div className="flex items-center gap-5">
          <Link
            href="/documents"
            className="hidden text-xs uppercase tracking-[0.16em] text-[#676b69] transition hover:text-[#15171a] sm:block"
          >
            Документы
          </Link>
          <Link
            href="/contacts"
            className="hidden text-xs uppercase tracking-[0.16em] text-[#676b69] transition hover:text-[#15171a] sm:block"
          >
            Контакты
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#676b69]"
          >
            <ChevronLeft size={15} /> На главную
          </Link>
        </div>
      </header>
      <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 font-mono text-xs text-[#6f792e]">КАТАЛОГ ПРОДУКЦИИ</p>
            <h1 className="max-w-4xl text-6xl font-medium leading-[.88] tracking-[-0.08em] sm:text-9xl">
              Подберите
              <br />
              <span className="text-[#858a87]">свою высоту.</span>
            </h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-[#626566]">
            Лестницы, стремянки, вышки-туры и подмости для дома, бизнеса и профессиональных задач.
          </p>
        </div>
        <div className="mt-20 border-y border-[#d8d8d2] py-5">
          <div className="flex items-center gap-3">
            <Search size={18} className="text-[#858a87]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Найти по названию или категории"
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#858a87]"
              aria-label="Поиск по каталогу"
            />
            <SlidersHorizontal size={17} className="text-[#858a87]" />
          </div>
        </div>
        <div className="mt-5 flex gap-2 overflow-x-auto pb-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${activeCategory === category ? 'border-[#15171a] bg-[#15171a] text-white' : 'border-[#c9cac4] text-[#6b6d6b] hover:border-[#15171a]'}`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-between">
          <p className="font-mono text-xs text-[#858a87]">
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
            <article
              key={product.code}
              className="group flex min-h-[410px] flex-col justify-between bg-[#15191d] p-6 text-white"
            >
              <div className="flex justify-between font-mono text-xs text-white/45">
                <span>{product.code}</span>
                <span>{product.category}</span>
              </div>
              <div
                className={`mx-auto my-8 h-44 w-24 rotate-12 rounded-[48%] border-[5px] border-[#b4c1c4] bg-gradient-to-r ${product.tone} transition duration-500 group-hover:rotate-[22deg] group-hover:scale-110`}
              />
              <div>
                <div className="flex items-end justify-between gap-4">
                  <h2 className="text-3xl tracking-[-0.06em]">{product.name}</h2>
                  <ArrowUpRight className="shrink-0 text-[#c9ff3d] transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <p className="mt-2 text-sm text-white/50">{product.description}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-[#c9ff3d]">
                  <span>{product.spec}</span>
                  <span>{product.material}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="border border-dashed border-[#c9cac4] py-20 text-center text-sm text-[#626566]">
            Ничего не нашли. Попробуйте другую категорию или название.
          </div>
        )}
        <div className="mt-24 grid gap-4 border-t border-[#d8d8d2] pt-8 md:grid-cols-3">
          <div>
            <p className="font-mono text-xs text-[#6f792e]">КАТАЛОГ</p>
            <p className="mt-4 text-sm leading-relaxed text-[#626566]">
              Полный ассортимент, паспорта изделий и актуальные характеристики соберём в рабочей
              версии.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-[#6f792e]">СЕРТИФИКАТЫ</p>
            <p className="mt-4 text-sm leading-relaxed text-[#626566]">
              Документы на продукцию и материалы будут доступны на странице каждой модели.
            </p>
          </div>
          <div>
            <p className="font-mono text-xs text-[#6f792e]">НЕ НАШЛИ</p>
            <Link
              href="/contacts"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold"
            >
              Запросить подбор <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
