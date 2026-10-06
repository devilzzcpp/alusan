import Link from 'next/link'
import { Container } from '@/components/container'
import { SiteBrand } from '@/components/site-brand'
import { getSiteSettings, telHref } from '@/lib/settings'

export async function SiteFooter() {
  const settings = await getSiteSettings()

  return (
    <footer className="border-t border-white/10 bg-brand-surface-1 py-10 text-white">
      <Container className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <SiteBrand dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
            Инженерные решения для высоты. Производство: {settings.city}.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-white/55">
          <Link href="/catalog" className="hover:text-white">
            Каталог
          </Link>
          <Link href="/about" className="hover:text-white">
            О компании
          </Link>
          <Link href="/articles" className="hover:text-white">
            Статьи
          </Link>
          <Link href="/documents" className="hover:text-white">
            Документы
          </Link>
        </div>
        <div className="flex flex-col gap-3 text-sm text-white/55">
          <Link href="/contacts" className="hover:text-white">
            Контакты
          </Link>
          <a href={telHref(settings.phone)} className="hover:text-white">
            {settings.phone}
          </a>
          <a href={`mailto:${settings.email}`} className="hover:text-white">
            {settings.email}
          </a>
        </div>
      </Container>
      <Container className="mt-10 border-t border-white/10 pt-4 text-xs text-white/30">
        alusan · {settings.city}
      </Container>
    </footer>
  )
}
