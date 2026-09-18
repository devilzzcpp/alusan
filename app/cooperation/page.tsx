import Link from 'next/link'
import { SiteBrand } from '@/components/site-brand'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
export default function CooperationPage() {
  return (
    <main className="min-h-screen bg-[#15191d] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-5 lg:px-10">
        <SiteBrand dark />
        <Link
          href="/"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/55"
        >
          <ArrowLeft size={15} /> На главную
        </Link>
      </header>
      <section className="mx-auto max-w-[1200px] px-5 py-24 lg:px-10 lg:py-32">
        <p className="mb-5 font-mono text-xs text-[#c9ff3d]">СОТРУДНИЧЕСТВО</p>
        <h1 className="max-w-5xl text-7xl font-medium leading-[.84] tracking-[-.09em] sm:text-9xl">
          Растём
          <br />
          <span className="text-[#72797b]">вместе.</span>
        </h1>
        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {['Оптовые поставки', 'Дилерская сеть', 'Проекты для бизнеса'].map((item, i) => (
            <div key={item} className="border border-white/10 p-6">
              <span className="font-mono text-xs text-[#c9ff3d]">0{i + 1}</span>
              <h2 className="mt-20 text-2xl tracking-[-.05em]">{item}</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                Подберём ассортимент, условия и логистику под задачи вашей компании.
              </p>
            </div>
          ))}
        </div>
        <Link
          href="/contacts"
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#c9ff3d] px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-[#15171a]"
        >
          Обсудить условия <ArrowUpRight size={15} />
        </Link>
      </section>
    </main>
  )
}
