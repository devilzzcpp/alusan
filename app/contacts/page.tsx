'use client'

import Link from 'next/link'
import { SiteFooter } from '@/components/site-footer'
import { SiteBrand } from '@/components/site-brand'
import { ArrowUpRight, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

export default function ContactsPage() {
  const [sent, setSent] = useState(false)
  return (
    <main className="min-h-screen bg-[#f4f3ef] text-[#15171a]">
      <header className="flex items-center justify-between border-b border-[#d8d8d2] px-5 py-5 lg:px-10">
        <SiteBrand />
        <Link
          href="/"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#676b69]"
        >
          <ChevronLeft size={15} /> На главную
        </Link>
      </header>
      <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-32">
        <p className="mb-5 font-mono text-xs text-[#6f792e]">КОНТАКТЫ</p>
        <h1 className="max-w-5xl text-6xl font-medium leading-[.88] tracking-[-0.08em] sm:text-9xl">
          Давайте
          <br />
          <span className="text-[#858a87]">обсудим</span>
          <br />
          задачу.
        </h1>
        <div className="mt-20 grid gap-12 border-t border-[#d8d8d2] pt-7 md:grid-cols-3">
          <div>
            <p className="mb-3 text-xs text-[#8b8d89]">Отдел продаж</p>
            <a href="tel:+77777777777" className="text-2xl tracking-[-0.05em]">
              +7 777 777-77-77
            </a>
          </div>
          <div>
            <p className="mb-3 text-xs text-[#8b8d89]">Почта</p>
            <a href="mailto:hello@alusan.ru" className="text-2xl tracking-[-0.05em]">
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
        <div className="mt-20 grid gap-12 border-t border-[#d8d8d2] pt-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs text-[#6f792e]">СВЯЖИТЕСЬ С НАМИ</p>
            <p className="mt-6 max-w-sm text-2xl leading-tight">
              Менеджер поможет выбрать модель, рассчитать заказ или подготовить условия
              сотрудничества.
            </p>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              setSent(true)
            }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <input
              required
              aria-label="ФИО"
              placeholder="ФИО"
              className="border-b border-[#c9cac4] bg-transparent px-0 py-4 outline-none placeholder:text-[#858a87] focus:border-[#15171a]"
            />
            <input
              required
              aria-label="Телефон"
              placeholder="Телефон"
              className="border-b border-[#c9cac4] bg-transparent px-0 py-4 outline-none placeholder:text-[#858a87] focus:border-[#15171a]"
            />
            <input
              type="email"
              aria-label="Email"
              placeholder="Email"
              className="border-b border-[#c9cac4] bg-transparent px-0 py-4 outline-none placeholder:text-[#858a87] focus:border-[#15171a] sm:col-span-2"
            />
            <textarea
              aria-label="Комментарий"
              placeholder="Комментарий"
              rows={3}
              className="resize-none border-b border-[#c9cac4] bg-transparent px-0 py-4 outline-none placeholder:text-[#858a87] focus:border-[#15171a] sm:col-span-2"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#15171a] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white transition hover:bg-[#c9ff3d] hover:text-[#15171a] sm:col-span-2 sm:justify-self-start"
            >
              {sent ? 'Заявка отправлена' : 'Отправить запрос'} <ArrowUpRight size={15} />
            </button>
            <p className="text-xs text-[#858a87] sm:col-span-2">
              Демо-форма: подключим сохранение заявок и уведомления в рабочей версии.
            </p>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
