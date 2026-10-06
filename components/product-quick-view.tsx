'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Product } from '@/lib/products'

export function ProductQuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const [mounted, setMounted] = useState(false)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    setMounted(true)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!mounted) return null

  const image = product.images[activeImage]

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/60 p-5"
      onClick={onClose}
    >
      <div
        className="grid max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-[2px] bg-white sm:grid-cols-2"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className={`relative flex min-h-[360px] items-center justify-center bg-gradient-to-br ${product.tone} p-8`}
        >
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/80 text-brand-ink transition hover:bg-white sm:hidden"
          >
            <X size={16} />
          </button>
          {image ? (
            <img
              src={image}
              alt={product.name}
              className="max-h-[320px] max-w-full rounded-[2px] object-contain"
            />
          ) : (
            <div className="h-56 w-32 rotate-12 rounded-[48%] border-[5px] border-[#b4c1c4] bg-gradient-to-r from-white/70 via-[#8799a0] to-white/70">
              <div className="mx-auto mt-16 h-1 w-4/5 bg-[#65747b]/70" />
              <div className="mx-auto mt-6 h-1 w-4/5 bg-[#65747b]/70" />
            </div>
          )}
          {product.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImage(
                    (index) => (index - 1 + product.images.length) % product.images.length,
                  )
                }
                aria-label="Предыдущее фото"
                className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-ink transition hover:bg-white"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setActiveImage((index) => (index + 1) % product.images.length)}
                aria-label="Следующее фото"
                className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-ink transition hover:bg-white"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Фото ${index + 1}`}
                    className={`size-2 rounded-full transition ${
                      index === activeImage ? 'bg-brand-ink' : 'bg-brand-ink/25'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col overflow-y-auto p-7">
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="ml-auto hidden size-9 place-items-center rounded-full border border-brand-border transition hover:bg-brand-paper-alt sm:grid"
          >
            <X size={16} />
          </button>
          <p className="mt-2 font-mono text-xs text-brand-muted-faint">{product.category}</p>
          <h2 className="mt-2 text-3xl tracking-[-0.05em]">{product.name}</h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted-dim">{product.description}</p>
          <div className="mt-5 space-y-1 font-mono text-xs text-brand-muted">
            <p>{product.spec}</p>
            <p>{product.material}</p>
          </div>
          <Link
            href={`/catalog/${product.categorySlug}/${product.slug}`}
            className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-brand-ink px-6 py-4 text-xs font-bold uppercase tracking-[.16em] text-white transition hover:bg-brand-blue sm:mt-auto"
          >
            Подробнее о товаре <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  )
}
