import Link from 'next/link'
import { SiteBrand } from '@/components/site-brand'
import { ArrowUpRight, ChevronLeft } from 'lucide-react'

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-[#15191d] text-white">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-5 lg:px-10">
        <SiteBrand dark />
        <Link
          href="/"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/55"
        >
          <ChevronLeft size={15} /> На главную
        </Link>
      </header>
      <section className="mx-auto max-w-[1440px] px-5 py-24 lg:px-10 lg:py-36">
        <p className="mb-5 font-mono text-xs text-[#c9ff3d]">02 / СИСТЕМА</p>
        <h1 className="max-w-5xl text-6xl font-medium leading-[.88] tracking-[-0.08em] sm:text-9xl">
          Инженерия,
          <br />
          <span className="text-[#72797b]">которую видно.</span>
        </h1>
        <div className="mt-24 grid gap-px bg-white/10 sm:grid-cols-3">
          <div className="bg-[#15191d] p-7">
            <p className="font-mono text-xs text-white/40">01 / PRECISION</p>
            <p className="mt-20 text-6xl tracking-[-0.08em]">
              0.8<span className="text-[#c9ff3d]">mm</span>
            </p>
            <p className="mt-3 text-sm text-white/45">точность соединения</p>
          </div>
          <div className="bg-[#15191d] p-7">
            <p className="font-mono text-xs text-white/40">02 / MATERIAL</p>
            <p className="mt-20 text-6xl tracking-[-0.08em]">
              AL<span className="text-[#c9ff3d]">6063</span>
            </p>
            <p className="mt-3 text-sm text-white/45">алюминиевый профиль</p>
          </div>
          <div className="bg-[#15191d] p-7">
            <p className="font-mono text-xs text-white/40">03 / CONTROL</p>
            <p className="mt-20 text-6xl tracking-[-0.08em]">
              100<span className="text-[#c9ff3d]">%</span>
            </p>
            <p className="mt-3 text-sm text-white/45">контроль каждого изделия</p>
          </div>
        </div>
        <Link
          href="/about"
          className="mt-12 inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#c9ff3d]"
        >
          Узнать о компании <ArrowUpRight size={16} />
        </Link>
      </section>
    </main>
  )
}
