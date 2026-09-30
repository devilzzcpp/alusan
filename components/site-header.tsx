import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Container } from '@/components/container'
import { SiteBrand } from '@/components/site-brand'

type SiteHeaderLink = { href: string; label: string }

export function SiteHeader({
  variant = 'light',
  links = [],
  backHref,
  backLabel,
}: {
  variant?: 'light' | 'dark'
  links?: SiteHeaderLink[]
  backHref: string
  backLabel: string
}) {
  const dark = variant === 'dark'
  return (
    <header className={`border-b ${dark ? 'border-white/10' : 'border-brand-border'}`}>
      <Container className="flex h-[76px] items-center justify-between">
        <SiteBrand dark={dark} />
        <div className="flex items-center gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hidden text-xs uppercase tracking-[0.16em] transition sm:block ${
                dark
                  ? 'text-white/55 hover:text-brand-lime'
                  : 'text-brand-muted-faint hover:text-brand-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={backHref}
            className={`flex items-center gap-2 text-xs uppercase tracking-[0.16em] transition ${
              dark
                ? 'text-white/55 hover:text-brand-lime'
                : 'text-brand-muted-faint hover:text-brand-ink'
            }`}
          >
            <ChevronLeft size={15} /> {backLabel}
          </Link>
        </div>
      </Container>
    </header>
  )
}
