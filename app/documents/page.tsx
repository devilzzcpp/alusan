'use client'

import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteBrand } from '@/components/site-brand'
import { ArrowLeft, Download, FileText, Maximize2 } from 'lucide-react'
import { useState } from 'react'

const sections = {
  Сертификаты: [
    {
      title: 'Сертификат соответствия',
      subtitle: 'Лестницы и стремянки alusan',
      code: 'Сертификат',
      color: 'bg-[#d8e7c0]',
    },
    {
      title: 'Система менеджмента качества',
      subtitle: 'Производственный контроль',
      code: 'Качество',
      color: 'bg-[#dce1e5]',
    },
  ],
  Паспорта: [
    {
      title: 'Паспорт изделия: стремянки СМ',
      subtitle: 'Серия серийных моделей',
      code: 'Паспорт',
      color: 'bg-[#e7dfd0]',
    },
    {
      title: 'Паспорт изделия: лестницы ЛМ',
      subtitle: 'Серия приставных лестниц',
      code: 'Паспорт',
      color: 'bg-[#d9e1dc]',
    },
    {
      title: 'Паспорт шарнирной системы',
      subtitle: 'Трансформируемые конструкции',
      code: 'Паспорт',
      color: 'bg-[#dfe0e8]',
    },
  ],
  Документация: [
    {
      title: 'Протокол испытаний конструкции',
      subtitle: 'Нагрузка, устойчивость, безопасность',
      code: 'Документ',
      color: 'bg-[#e3ded5]',
    },
    {
      title: 'Инструкция по эксплуатации',
      subtitle: 'Правила безопасной работы',
      code: 'Документ',
      color: 'bg-[#d8e5e4]',
    },
    {
      title: 'Рекомендации по уходу',
      subtitle: 'Сохраняем ресурс изделия',
      code: 'Документ',
      color: 'bg-[#e3e5d1]',
    },
  ],
}

type Section = keyof typeof sections

export default function DocumentsPage() {
  const [activeSection, setActiveSection] = useState<Section>('Сертификаты')
  const items = sections[activeSection]

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-[#15171a]">
      <header className="flex items-center justify-between border-b border-[#d8d8d2] px-5 py-5 lg:px-10">
        <SiteBrand />
        <div className="flex items-center gap-5">
          <Link
            href="/catalog"
            className="hidden text-xs uppercase tracking-[0.16em] text-[#676b69] sm:block"
          >
            Каталог
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#676b69]"
          >
            <ArrowLeft size={15} /> На главную
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-[1200px] px-5 py-20 lg:px-10 lg:py-28">
        <p className="mb-5 font-mono text-xs text-[#6f792e]">ДОКУМЕНТЫ И КАЧЕСТВО</p>
        <h1 className="max-w-4xl text-7xl font-medium leading-[.84] tracking-[-.09em] sm:text-9xl">
          Всё, что
          <br />
          <span className="text-[#858a87]">подтверждает</span>
          <br />
          качество.
        </h1>
        <div className="mt-16 flex flex-wrap gap-2 border-b border-[#d8d8d2] pb-5">
          {(Object.keys(sections) as Section[]).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`rounded-full border px-5 py-3 text-xs uppercase tracking-[.14em] transition ${activeSection === section ? 'border-[#15171a] bg-[#15171a] text-white' : 'border-[#c9cac4] text-[#676b69] hover:border-[#15171a]'}`}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-[2px] border border-[#d8d8d2] bg-white shadow-[0_12px_30px_rgba(21,23,26,.04)]"
            >
              <div className={`relative aspect-[1.25] ${item.color} p-5`}>
                <div className="flex justify-between font-mono text-[10px] text-[#15171a]/55">
                  <span>{item.code}</span>
                  <span>Документ</span>
                </div>
                <div className="absolute inset-x-[18%] top-[20%] bottom-[12%] rotate-[-3deg] border border-[#15171a]/20 bg-white/70 p-5 shadow-[8px_10px_0_rgba(21,23,26,.08)] transition duration-500 group-hover:rotate-0 group-hover:scale-[1.03]">
                  <div className="flex items-center justify-between border-b border-[#15171a]/15 pb-3">
                    <FileText size={20} />
                    <span className="font-mono text-[8px]">alusan</span>
                  </div>
                  <div className="mt-5 h-2 w-2/3 bg-[#15171a]/15" />
                  <div className="mt-3 h-1 w-full bg-[#15171a]/10" />
                  <div className="mt-2 h-1 w-4/5 bg-[#15171a]/10" />
                  <div className="mt-8 ml-auto size-9 rounded-full border border-[#849d26]/60" />
                </div>
                <Maximize2
                  className="absolute bottom-5 right-5 text-[#15171a]/50 transition group-hover:rotate-45"
                  size={16}
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <h2 className="text-xl tracking-[-.04em]">{item.title}</h2>
                  <p className="mt-2 text-sm text-[#676b69]">{item.subtitle}</p>
                </div>
                <button
                  aria-label={`Скачать ${item.title}`}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-[#c9cac4] transition hover:bg-[#15171a] hover:text-white"
                >
                  <Download size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
