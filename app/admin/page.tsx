'use client'

import Link from 'next/link'
import { SiteBrand } from '@/components/site-brand'
import {
  ArrowLeft,
  BarChart3,
  Box,
  FileText,
  ImagePlus,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Settings,
  Users,
} from 'lucide-react'

const rows = [
  ['A1 / 03', 'Трансформер', 'В наличии', '24 шт.', 'Изменить'],
  ['A2 / 11', 'Платформа', 'В наличии', '16 шт.', 'Изменить'],
  ['A3 / 09', 'Вышка', 'Под заказ', '—', 'Изменить'],
]

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f1f2ef] text-[#141719]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[#dadbd5] bg-[#171b1f] p-6 text-white lg:block">
        <div className="mb-16">
          <SiteBrand dark />
        </div>
        <p className="mb-4 text-[10px] uppercase tracking-[0.2em] text-white/35">
          Рабочее пространство
        </p>
        <nav className="flex flex-col gap-2 text-sm">
          <a
            className="flex items-center gap-3 rounded-lg bg-white/10 px-3 py-3 text-[#c9ff3d]"
            href="#"
          >
            <LayoutDashboard size={17} /> Обзор
          </a>
          <a className="flex items-center gap-3 px-3 py-3 text-white/55" href="#products">
            <Box size={17} /> Каталог
          </a>
          <a className="flex items-center gap-3 px-3 py-3 text-white/55" href="#content">
            <FileText size={17} /> Контент
          </a>
          <a className="flex items-center gap-3 px-3 py-3 text-white/55" href="#">
            <Users size={17} /> Заявки
          </a>
          <a className="flex items-center gap-3 px-3 py-3 text-white/55" href="#">
            <Settings size={17} /> Настройки
          </a>
        </nav>
      </aside>
      <div className="lg:ml-64">
        <header className="flex h-20 items-center justify-between border-b border-[#dadbd5] bg-white px-5 sm:px-10">
          <div>
            <Link href="/" className="mb-1 flex items-center gap-2 text-xs text-[#7e837f]">
              <ArrowLeft size={14} /> На сайт
            </Link>
            <h1 className="text-xl font-medium tracking-[-0.04em]">Добрый день, Алексей</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-[#7e837f] sm:block">
              Последнее изменение: сегодня, 12:42
            </span>
            <div className="grid size-10 place-items-center rounded-full bg-[#c9ff3d] font-semibold">
              А
            </div>
          </div>
        </header>
        <div className="p-5 sm:p-10">
          <div className="mb-9 flex items-end justify-between">
            <div>
              <p className="mb-2 font-mono text-xs text-[#7a882d]">/ DASHBOARD</p>
              <h2 className="text-4xl font-medium tracking-[-0.07em]">Сводка проекта</h2>
            </div>
            <button className="hidden items-center gap-2 rounded-full bg-[#15191d] px-5 py-3 text-xs font-semibold text-white sm:flex">
              <Plus size={15} /> Добавить товар
            </button>
          </div>
          <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Stat
              title="Просмотры сайта"
              value="18 420"
              change="+12.8%"
              icon={<BarChart3 size={19} />}
            />
            <Stat title="Заявки" value="284" change="+8.2%" icon={<Users size={19} />} />
            <Stat
              title="Товаров в каталоге"
              value="42"
              change="+3 новых"
              icon={<Box size={19} />}
            />
            <Stat
              title="Конверсия"
              value="4.6%"
              change="+0.4%"
              icon={<LayoutDashboard size={19} />}
            />
          </div>
          <section
            id="products"
            className="overflow-hidden rounded-xl border border-[#dadbd5] bg-white"
          >
            <div className="flex items-center justify-between border-b border-[#dadbd5] px-5 py-5 sm:px-7">
              <div>
                <h3 className="font-medium">Каталог продукции</h3>
                <p className="mt-1 text-xs text-[#898d89]">
                  Управляйте карточками товаров и остатками
                </p>
              </div>
              <button
                className="rounded-full border border-[#dadbd5] p-2"
                aria-label="Дополнительные действия"
              >
                <MoreHorizontal size={18} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-[#f7f7f4] text-[10px] uppercase tracking-[0.16em] text-[#8b8e89]">
                  <tr>
                    <th className="px-7 py-4 font-medium">Артикул</th>
                    <th className="px-7 py-4 font-medium">Название</th>
                    <th className="px-7 py-4 font-medium">Статус</th>
                    <th className="px-7 py-4 font-medium">Остаток</th>
                    <th className="px-7 py-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row[0]} className="border-t border-[#ecece7]">
                      <td className="px-7 py-5 font-mono text-xs">{row[0]}</td>
                      <td className="px-7 py-5 font-medium">{row[1]}</td>
                      <td className="px-7 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-medium ${row[2] === 'В наличии' ? 'bg-[#e9f5c2] text-[#536b16]' : 'bg-[#fff0cc] text-[#916d1c]'}`}
                        >
                          {row[2]}
                        </span>
                      </td>
                      <td className="px-7 py-5 text-[#707571]">{row[3]}</td>
                      <td className="px-7 py-5 text-right text-xs text-[#6b762d]">{row[4]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section id="content" className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-dashed border-[#bfc2ba] bg-[#fafaf7] p-7">
              <ImagePlus className="mb-14 text-[#7a882d]" size={24} />
              <h3 className="text-xl font-medium tracking-[-0.04em]">Медиа-центр</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#777b77]">
                Обновляйте изображения коллекций, кейсы и материалы для сайта.
              </p>
              <button className="mt-6 rounded-full border border-[#15191d] px-4 py-2 text-xs">
                Открыть медиатеку
              </button>
            </div>
            <div className="rounded-xl bg-[#c9ff3d] p-7">
              <p className="mb-14 font-mono text-xs text-[#536b16]">БЫСТРЫЙ СТАРТ</p>
              <h3 className="text-xl font-medium tracking-[-0.04em]">Сайт готов к обновлениям</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#53651c]">
                Изменения публикуются сразу после сохранения — без помощи разработчика.
              </p>
              <button className="mt-6 rounded-full bg-[#15191d] px-4 py-2 text-xs text-white">
                Посмотреть инструкцию
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

function Stat({
  title,
  value,
  change,
  icon,
}: {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-[#dadbd5] bg-white p-5">
      <div className="mb-8 flex items-center justify-between text-[#7a882d]">
        <span className="grid size-9 place-items-center rounded-full bg-[#eff7d2]">{icon}</span>
        <span className="text-[10px]">{change}</span>
      </div>
      <p className="text-xs text-[#858985]">{title}</p>
      <p className="mt-1 text-3xl font-medium tracking-[-0.07em]">{value}</p>
    </div>
  )
}
