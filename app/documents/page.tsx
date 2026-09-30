'use client'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { PillFilter } from '@/components/pill-filter'
import { Download, FileText, Maximize2 } from 'lucide-react'
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
const sectionOptions = Object.keys(sections) as Section[]

export default function DocumentsPage() {
  const [activeSection, setActiveSection] = useState<Section>('Сертификаты')
  const items = sections[activeSection]

  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader
        links={[{ href: '/catalog', label: 'Каталог' }]}
        backHref="/"
        backLabel="На главную"
      />

      <section className="py-20 lg:py-28">
        <Container width="narrow">
          <SectionEyebrow className="mb-5 text-brand-muted">ДОКУМЕНТЫ И КАЧЕСТВО</SectionEyebrow>
          <h1 className="heading-1 max-w-4xl">
            Всё, что
            <br />
            <span className="text-brand-muted-faintest">подтверждает</span>
            <br />
            качество.
          </h1>
          <div className="mt-16 border-b border-brand-border pb-5">
            <PillFilter
              options={sectionOptions}
              active={activeSection}
              onChange={setActiveSection}
              size="md"
            />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[2px] border border-brand-border bg-white shadow-[0_12px_30px_rgba(21,23,26,.04)]"
              >
                <div className={`relative aspect-[1.25] ${item.color} p-5`}>
                  <div className="flex justify-between font-mono text-[10px] text-brand-ink/55">
                    <span>{item.code}</span>
                    <span>Документ</span>
                  </div>
                  <div className="absolute inset-x-[18%] top-[20%] bottom-[12%] rotate-[-3deg] border border-brand-ink/20 bg-white/70 p-5 shadow-[8px_10px_0_rgba(21,23,26,.08)] transition duration-500 group-hover:rotate-0 group-hover:scale-[1.03]">
                    <div className="flex items-center justify-between border-b border-brand-ink/15 pb-3">
                      <FileText size={20} />
                      <span className="font-mono text-[8px]">alusan</span>
                    </div>
                    <div className="mt-5 h-2 w-2/3 bg-brand-ink/15" />
                    <div className="mt-3 h-1 w-full bg-brand-ink/10" />
                    <div className="mt-2 h-1 w-4/5 bg-brand-ink/10" />
                    <div className="mt-8 ml-auto size-9 rounded-full border border-brand-lime-ink/60" />
                  </div>
                  <Maximize2
                    className="absolute bottom-5 right-5 text-brand-ink/50 transition group-hover:rotate-45"
                    size={16}
                  />
                </div>
                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <h2 className="text-xl tracking-[-.04em]">{item.title}</h2>
                    <p className="mt-2 text-sm text-brand-muted-faint">{item.subtitle}</p>
                  </div>
                  <button
                    aria-label={`Скачать ${item.title}`}
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-brand-border-strong transition hover:bg-brand-ink hover:text-white"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <SiteFooter />
    </main>
  )
}
