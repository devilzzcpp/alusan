'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Container } from '@/components/container'

const navLinks = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/about', label: 'О компании' },
  { href: '/articles', label: 'Статьи' },
  { href: '/documents', label: 'Документы' },
  { href: '/contacts', label: 'Контакты' },
]

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-brand-surface-1/85 text-white backdrop-blur-xl">
      <Container className="flex h-[76px] items-center justify-between">
        <Link href="#top" aria-label="АЛЮСАН — на главную">
          <img src="/brand/logo-white.svg" alt="АЛЮСАН" className="h-11 w-auto" />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium tracking-[-0.02em] text-white/70 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand-lime">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#contacts"
            className="hidden rounded-full bg-brand-lime px-5 py-3 text-sm font-semibold tracking-[-0.02em] text-brand-ink transition hover:bg-white sm:block"
          >
            Обсудить проект <ArrowUpRight className="ml-2 inline" size={14} />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full border border-white/20 p-3 lg:hidden"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>
      {menuOpen && (
        <div className="border-t border-white/10 bg-brand-surface-1 px-5 py-6 lg:hidden">
          <div className="flex flex-col gap-5 text-sm uppercase tracking-widest">
            {navLinks.map((link) => (
              <Link key={link.href} onClick={() => setMenuOpen(false)} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
