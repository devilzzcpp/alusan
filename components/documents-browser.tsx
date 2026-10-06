'use client'

import { Download, FileText, Maximize2 } from 'lucide-react'
import { useState } from 'react'
import { PillFilter } from '@/components/pill-filter'
import { DOCUMENT_CATEGORIES, type Document } from '@/lib/documents'

export function DocumentsBrowser({ documents }: { documents: Document[] }) {
  const sectionOptions = DOCUMENT_CATEGORIES.filter((category) =>
    documents.some((document) => document.category === category),
  )
  const [activeSection, setActiveSection] = useState(sectionOptions[0])
  const items = documents.filter((document) => document.category === activeSection)

  return (
    <>
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
            key={item.id}
            className="group overflow-hidden rounded-[2px] border border-brand-border bg-white shadow-[0_12px_30px_rgba(21,23,26,.04)]"
          >
            {item.fileUrl ? (
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Открыть ${item.title}`}
                className={`relative block aspect-[1.25] ${item.color} p-5`}
              >
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
                  <div className="mt-8 ml-auto size-9 rounded-full border border-[#849d26]/60" />
                </div>
                <Maximize2
                  className="absolute bottom-5 right-5 text-brand-ink/50 transition group-hover:rotate-45"
                  size={16}
                />
              </a>
            ) : (
              <div className={`relative aspect-[1.25] ${item.color} p-5`}>
                <div className="flex justify-between font-mono text-[10px] text-brand-ink/55">
                  <span>{item.code}</span>
                  <span>Документ</span>
                </div>
                <div className="absolute inset-x-[18%] top-[20%] bottom-[12%] rotate-[-3deg] border border-brand-ink/20 bg-white/70 p-5 shadow-[8px_10px_0_rgba(21,23,26,.08)]">
                  <div className="flex items-center justify-between border-b border-brand-ink/15 pb-3">
                    <FileText size={20} />
                    <span className="font-mono text-[8px]">alusan</span>
                  </div>
                  <div className="mt-5 h-2 w-2/3 bg-brand-ink/15" />
                  <div className="mt-3 h-1 w-full bg-brand-ink/10" />
                  <div className="mt-2 h-1 w-4/5 bg-brand-ink/10" />
                  <div className="mt-8 ml-auto size-9 rounded-full border border-[#849d26]/60" />
                </div>
                <Maximize2 className="absolute bottom-5 right-5 text-brand-ink/30" size={16} />
              </div>
            )}
            <div className="flex items-start justify-between gap-4 p-5">
              <div>
                <h2 className="text-xl tracking-[-.04em]">{item.title}</h2>
                <p className="mt-2 text-sm text-brand-muted-faint">{item.subtitle}</p>
              </div>
              {item.fileUrl ? (
                <a
                  href={item.fileUrl}
                  download
                  aria-label={`Скачать ${item.title}`}
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-brand-border-strong transition hover:bg-brand-ink hover:text-white"
                >
                  <Download size={16} />
                </a>
              ) : (
                <button
                  disabled
                  aria-label={`${item.title} скоро будет доступен`}
                  title="Файл скоро будет доступен"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-brand-border-strong text-brand-ink/30"
                >
                  <Download size={16} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
