import Link from 'next/link'
import { SiteBrand } from '@/components/site-brand'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#101317] px-5 py-10 text-white lg:px-10">
      <div className="mx-auto grid max-w-[1440px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <SiteBrand dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
            Инженерные решения для высоты. Производство в Ростове-на-Дону.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-white/55">
          <Link href="/catalog" className="hover:text-white">
            Каталог
          </Link>
          <Link href="/about" className="hover:text-white">
            О компании
          </Link>
          <Link href="/documents" className="hover:text-white">
            Документы
          </Link>
        </div>
        <div className="flex flex-col gap-3 text-sm text-white/55">
          <Link href="/contacts" className="hover:text-white">
            Контакты
          </Link>
          <a href="tel:+77777777777" className="hover:text-white">
            +7 777 777 77 77
          </a>
          <a href="mailto:hello@alusan.ru" className="hover:text-white">
            hello@alusan.ru
          </a>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1440px] border-t border-white/10 pt-4 text-xs text-white/30">
        alusan · Ростов-на-Дону
      </div>
    </footer>
  )
}
