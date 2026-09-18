'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ChevronDown, Menu, MoveUpRight, Search, ShieldCheck, X } from 'lucide-react'
import { SiteBrand } from '@/components/site-brand'

const products = [
  {
    code: 'Бытовая серия',
    name: 'Трансформер',
    meta: 'Три секции · высота до пяти метров',
    tone: 'from-[#c5d7dc] via-[#eef3f2] to-[#879ba4]',
  },
  {
    code: 'Рабочая серия',
    name: 'Платформа',
    meta: 'Семь ступеней · рабочая высота',
    tone: 'from-[#d7d2c7] via-[#f5f1e8] to-[#998f80]',
  },
  {
    code: 'Профессиональная серия',
    name: 'Вышка',
    meta: 'Шесть ступеней · высота до пяти метров',
    tone: 'from-[#aebcc7] via-[#e9edf0] to-[#748494]',
  },
]

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Все решения')
  const [requestSent, setRequestSent] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#f4f3ef] text-[#15171a]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-[#101317]/85 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 lg:px-10">
          <Link href="#top" className="flex items-center gap-3" aria-label="alusan — на главную">
            <span className="grid size-9 place-items-center rounded-full bg-[#c9ff3d] p-1.5 text-[#15171a]">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ladder_6196850-48MvlhtQlModXcOdVuz8iQI5uFXqcw.png"
                alt="Логотип alusan"
                className="size-full object-contain"
              />
            </span>
            <span className="font-mono text-lg font-bold tracking-[-0.08em]">alusan</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium tracking-[-0.02em] text-white/70 lg:flex">
            <Link href="/catalog" className="transition hover:text-[#c9ff3d]">
              Каталог
            </Link>

            <Link href="/about" className="transition hover:text-[#c9ff3d]">
              О компании
            </Link>
            <Link href="/documents" className="transition hover:text-[#c9ff3d]">
              Документы
            </Link>
            <Link href="/contacts" className="transition hover:text-[#c9ff3d]">
              Контакты
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contacts"
              className="hidden rounded-full bg-[#c9ff3d] px-5 py-3 text-sm font-semibold tracking-[-0.02em] text-[#15171a] transition hover:bg-white sm:block"
            >
              Обсудить проект <ArrowUpRight className="ml-2 inline" size={14} />
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-full border border-white/20 p-3 lg:hidden"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-white/10 bg-[#101317] px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-5 text-sm uppercase tracking-widest">
              <Link onClick={() => setMenuOpen(false)} href="/catalog">
                Каталог
              </Link>
              <Link onClick={() => setMenuOpen(false)} href="/about">
                О компании
              </Link>
              <Link onClick={() => setMenuOpen(false)} href="/documents">
                Документы
              </Link>
              <Link onClick={() => setMenuOpen(false)} href="/contacts">
                Контакты
              </Link>
            </div>
          </div>
        )}
      </header>

      <section
        id="top"
        className="relative flex min-h-[820px] items-end overflow-hidden bg-[#111518] pt-28 text-white lg:min-h-[940px]"
      >
        <img
          src="/hero-ladders.png"
          alt="Алюминиевая лестница в архитектурном пространстве"
          className="absolute inset-0 size-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,15,.96),rgba(8,12,15,.58)_42%,rgba(8,12,15,.12)),linear-gradient(0deg,rgba(8,12,15,.78),transparent_55%)]" />
        <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-20 lg:px-10 lg:pb-28">
          <div className="mb-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/55">
            <span className="size-2 rounded-full bg-[#c9ff3d]" /> Инженерные решения для высоты
          </div>
          <h1 className="max-w-5xl text-[clamp(4rem,11vw,10.8rem)] font-medium leading-[.78] tracking-[-0.11em]">
            Высота
            <br />
            <span className="text-[#c9ff3d]">нового</span> уровня.
          </h1>
          <div className="mt-10 flex max-w-2xl flex-col justify-between gap-8 border-t border-white/20 pt-5 text-sm text-white/70 sm:flex-row">
            <p className="max-w-sm leading-relaxed">
              Лестничные системы, которые выглядят как инженерия будущего. Спроектированы для тех,
              кто ценит форму не меньше функции.
            </p>
            <a
              href="#solutions"
              className="group flex items-center gap-3 self-start font-semibold uppercase tracking-[0.16em] text-white"
            >
              Исследовать решения{' '}
              <span className="grid size-11 place-items-center rounded-full bg-[#c9ff3d] text-[#15171a] transition group-hover:rotate-45">
                <MoveUpRight size={17} />
              </span>
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(201,255,61,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(201,255,61,.12)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_bottom,transparent,black_35%,transparent)]" />
        <div className="absolute bottom-7 right-6 hidden font-mono text-[10px] text-white/40 lg:block">
          Производство в Ростове-на-Дону
        </div>
      </section>

      <section id="solutions" className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-36">
        <div className="mb-12 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 font-mono text-xs text-[#6f792e]">Коллекция изделий</p>
            <h2 className="max-w-3xl text-5xl font-medium tracking-[-0.07em] sm:text-7xl">
              Конструкции,
              <br />
              <span className="text-[#7c807d]">которые работают.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-[#626566]">
            От компактной стремянки до полноценной рабочей вышки. Один визуальный язык, сотни
            сценариев.
          </p>
        </div>
        <div className="mb-9 flex flex-wrap gap-2">
          {['Все решения', 'Для дома', 'Для бизнеса', 'Профи'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${activeCategory === cat ? 'border-[#15171a] bg-[#15171a] text-white' : 'border-[#c9cac4] text-[#6b6d6b] hover:border-[#15171a]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.code}
              className={`group relative overflow-hidden rounded-[2px] bg-gradient-to-br ${product.tone} p-5 ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
            >
              <div
                className={`relative flex min-h-[260px] flex-col justify-between ${index === 0 ? 'md:min-h-[540px]' : ''}`}
              >
                <div className="flex justify-between font-mono text-[10px] text-[#15171a]/60">
                  <span>Коллекция</span>
                  <span>Изделие</span>
                </div>
                <div className="absolute inset-x-0 top-1/2 h-px bg-[#15171a]/15" />
                <div className="mx-auto mt-7 h-32 w-16 rotate-[18deg] rounded-[48%] border-[5px] border-[#65747b]/60 bg-gradient-to-r from-white/70 via-[#8799a0] to-white/70 shadow-[10px_22px_22px_rgba(20,35,40,.23)] transition duration-500 group-hover:rotate-[25deg] group-hover:scale-110 md:h-48 md:w-24">
                  <div className="mx-auto mt-10 h-1 w-4/5 bg-[#65747b]/70" />
                  <div className="mx-auto mt-16 h-1 w-4/5 bg-[#65747b]/70" />
                </div>
                <div>
                  <div className="mb-1 flex items-end justify-between">
                    <h3 className="text-3xl font-medium tracking-[-0.06em]">{product.name}</h3>
                    <ArrowUpRight
                      className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                      size={22}
                    />
                  </div>
                  <p className="text-xs text-[#15171a]/60">{product.meta}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="system" className="bg-[#15191d] px-5 py-24 text-white lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <p className="mb-5 font-mono text-xs text-[#c9ff3d]">Инженерная система alusan</p>
              <h2 className="max-w-xl text-5xl font-medium tracking-[-0.07em] sm:text-7xl">
                Не просто
                <br />
                <span className="text-[#72797b]">лестница.</span>
              </h2>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/55">
                Мы собрали в одном продукте точность производств��, эргономику и визуальную тишину.
                Никаких лишних деталей — только то, что делает жизнь выше.
              </p>
              <a
                href="#about"
                className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#c9ff3d]"
              >
                Как мы это делаем <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border border-white/10 p-6 sm:col-span-2">
                <div className="mb-24 flex justify-between font-mono text-xs text-white/40">
                  <span>Точность</span>
                  <span>Точность</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-6xl font-medium tracking-[-0.08em]">
                      Высокая <span className="text-[#c9ff3d]">точность</span>
                    </div>
                    <p className="mt-2 text-xs text-white/45">точность сварного соединения</p>
                  </div>
                  <ShieldCheck className="text-[#c9ff3d]" size={33} />
                </div>
              </div>
              <div className="border border-white/10 p-6">
                <div className="mb-16 font-mono text-xs text-white/40">Материал</div>
                <div className="text-4xl font-medium tracking-[-0.07em]">
                  Алюминий
                  <br />
                  <span className="text-[#c9ff3d]">авиационный сплав</span>
                </div>
                <p className="mt-4 text-xs text-white/45">авиационный алюминий</p>
              </div>
              <div className="border border-white/10 p-6">
                <div className="mb-16 font-mono text-xs text-white/40">Гарантия</div>
                <div className="text-4xl font-medium tracking-[-0.07em]">
                  Десять <span className="text-[#c9ff3d]">лет</span>
                </div>
                <p className="mt-4 text-xs text-white/45">гарантия на конструкцию</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-b border-[#d8d8d2] bg-[#c9ff3d] px-5 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto flex max-w-[1440px] flex-col gap-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-5 font-mono text-xs text-[#52651c]">О производстве</p>
            <h2 className="max-w-3xl text-5xl font-medium leading-[.9] tracking-[-0.08em] sm:text-8xl">
              Сделано
              <br />в России.
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-snug">
            Производство лестниц и алюминиевых конструкций в Ростове. Реальные факты о компании и
            производстве появятся здесь после наполнения контентом.
          </p>
        </div>
      </section>

      <section className="bg-[#f4f3ef] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-5 font-mono text-xs text-[#6f792e]">Документы и гарантии</p>
              <h2 className="text-5xl font-medium tracking-[-0.07em] sm:text-7xl">
                Подтверждено
                <br />
                <span className="text-[#858a87]">документами.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[#626566]">
              Сертификаты и протоколы на материалы и готовые изделия.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div className="border border-[#d8d8d2] bg-white p-6">
              <div className="mb-20 font-mono text-xs text-[#8b8d89]">Документ</div>
              <h3 className="text-2xl tracking-[-0.05em]">Сертификат соответствия</h3>
              <p className="mt-3 text-sm text-[#626566]">На лестницы и стремянки alusan</p>
            </div>
            <div className="border border-[#d8d8d2] bg-white p-6">
              <div className="mb-20 font-mono text-xs text-[#8b8d89]">Документ</div>
              <h3 className="text-2xl tracking-[-0.05em]">Протокол испытаний</h3>
              <p className="mt-3 text-sm text-[#626566]">Нагрузка, устойчивость, безопасность</p>
            </div>
            <div className="border border-[#d8d8d2] bg-white p-6">
              <div className="mb-20 font-mono text-xs text-[#8b8d89]">Документ</div>
              <h3 className="text-2xl tracking-[-0.05em]">Паспорт изделия</h3>
              <p className="mt-3 text-sm text-[#626566]">Комплект документов на каждую модель</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="bg-[#f4f3ef] px-5 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 flex justify-between">
            <div>
              <p className="mb-5 font-mono text-xs text-[#6f792e]">Связаться с нами</p>
              <h2 className="text-5xl font-medium tracking-[-0.08em] sm:text-8xl">Начнём?</h2>
            </div>
            <Search className="hidden text-[#c9cac4] sm:block" size={44} />
          </div>
          <div className="grid gap-12 border-t border-[#d8d8d2] pt-7 md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs text-[#8b8d89]">Отдел продаж</p>
              <a
                href="tel:+74012345678"
                className="text-2xl tracking-[-0.05em] transition hover:text-[#6f792e]"
              >
                +7 777 777-77-77
              </a>
            </div>
            <div>
              <p className="mb-3 text-xs text-[#8b8d89]">Почта</p>
              <a
                href="mailto:hello@alusan.ru"
                className="text-2xl tracking-[-0.05em] transition hover:text-[#6f792e]"
              >
                hello@alusan.ru
              </a>
            </div>
            <div>
              <p className="mb-3 text-xs text-[#8b8d89]">Производство</p>
              <p className="text-lg">
                Ростов-на-Дону
                <br />
                ул. Производственная, 7
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="request" className="bg-[#c9ff3d] px-5 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="mb-5 font-mono text-xs text-[#52651c]">Персональный подбор</p>
            <h2 className="max-w-xl text-5xl font-medium leading-[.9] tracking-[-0.08em] sm:text-7xl">
              Рассчитаем
              <br />
              вашу задачу.
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-[#52651c]">
              Оставьте контакты — уточним сценарий использования и подберём подходящую модель.
            </p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setRequestSent(true)
            }}
            className="grid gap-3 sm:grid-cols-2"
          >
            <input
              required
              name="name"
              placeholder="Ваше имя"
              aria-label="Ваше имя"
              className="border-b border-[#52651c]/40 bg-transparent px-0 py-4 text-lg outline-none placeholder:text-[#52651c]/60 focus:border-[#15171a]"
            />
            <input
              required
              name="phone"
              placeholder="Телефон"
              aria-label="Телефон"
              className="border-b border-[#52651c]/40 bg-transparent px-0 py-4 text-lg outline-none placeholder:text-[#52651c]/60 focus:border-[#15171a]"
            />
            <select
              name="type"
              aria-label="Тип задачи"
              className="border-b border-[#52651c]/40 bg-transparent px-0 py-4 text-lg outline-none sm:col-span-2"
            >
              <option>Выберите решение</option>
              <option>Стремянка для дома</option>
              <option>Лестница для бизнеса</option>
              <option>Профессиональная вышка</option>
            </select>
            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#15171a] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white transition hover:bg-white hover:text-[#15171a] sm:col-span-2 sm:justify-self-start"
            >
              {requestSent ? 'Заявка отправлена' : 'Отправить заявку'}{' '}
              <ArrowUpRight className="ml-2" size={15} />
            </button>
            <p className="text-xs text-[#52651c] sm:col-span-2">
              Демо-форма: подключим отправку заявок и уведомления в рабочей версии.
            </p>
          </form>
        </div>
      </section>

      <footer className="bg-[#101317] px-5 py-12 text-white lg:px-10 lg:py-16">
        <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-12">
          <div>
            <SiteBrand dark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/40">
              Инженерные решения для высоты. Производство в Ростове-на-Дону.
            </p>
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#c9ff3d]">
              Навигация
            </p>
            <div className="flex flex-col items-start gap-3 text-sm text-white/55">
              <Link href="/catalog" className="transition hover:text-white">
                Каталог
              </Link>
              <Link href="/about" className="transition hover:text-white">
                О компании
              </Link>
            </div>
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#c9ff3d]">
              Информация
            </p>
            <div className="flex flex-col items-start gap-3 text-sm text-white/55">
              <Link href="/documents" className="transition hover:text-white">
                Документы
              </Link>
              <Link href="/contacts" className="transition hover:text-white">
                Контакты
              </Link>
              <a href="#request" className="transition hover:text-white">
                Оставить заявку
              </a>
            </div>
          </div>
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#c9ff3d]">
              Связь
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/55">
              <a href="tel:+77777777777" className="transition hover:text-white">
                +7 777 777-77-77
              </a>
              <a href="mailto:hello@alusan.ru" className="transition hover:text-white">
                hello@alusan.ru
              </a>
              <span>Ростов-на-Дону</span>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-[1440px] flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs text-white/30 sm:flex-row">
          <span>alusan · Ростов-на-Дону</span>
          <span>Высота — это состояние системы.</span>
          <span>Русский</span>
        </div>
      </footer>
    </main>
  )
}
