'use client'

import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/products'
import { ProductQuickView } from '@/components/product-quick-view'

type ProductCardProps = {
  product: Product
  variant?: 'teaser' | 'catalog' | 'category'
  featured?: boolean
  label?: string
}

export function ProductCard({
  product,
  variant = 'catalog',
  featured = false,
  label,
}: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false)
  const openQuickView = () => setQuickViewOpen(true)
  const hero = product.images[0]

  const card = (() => {
    if (variant === 'teaser') {
      return (
        <article
          className={`group relative h-full overflow-hidden rounded-[2px] bg-gradient-to-br ${product.tone} p-5`}
        >
          <div
            className={`relative flex h-full min-h-[260px] flex-col justify-between ${featured ? 'md:min-h-[540px]' : ''}`}
          >
            <div className="flex justify-between font-mono text-[10px] text-brand-ink/60">
              <span>Коллекция</span>
              <span>Изделие</span>
            </div>
            <div className="absolute inset-x-0 top-1/2 h-px bg-brand-ink/15" />
            {hero ? (
              <img
                src={hero}
                alt={product.name}
                className={`mx-auto mt-7 h-44 w-44 rounded-[2px] object-contain transition duration-500 group-hover:scale-105 ${
                  featured ? 'md:h-[28rem] md:w-[28rem]' : 'md:h-64 md:w-64'
                }`}
              />
            ) : (
              <div className="mx-auto mt-7 h-32 w-16 rotate-[18deg] rounded-[48%] border-[5px] border-[#65747b]/60 bg-gradient-to-r from-white/70 via-[#8799a0] to-white/70 shadow-[10px_22px_22px_rgba(20,35,40,.23)] transition duration-500 group-hover:rotate-[25deg] group-hover:scale-110 md:h-48 md:w-24">
                <div className="mx-auto mt-10 h-1 w-4/5 bg-[#65747b]/70" />
                <div className="mx-auto mt-16 h-1 w-4/5 bg-[#65747b]/70" />
              </div>
            )}
            <div>
              <div className="mb-1 flex items-end justify-between">
                <h3 className="text-3xl font-medium tracking-[-0.06em]">{product.name}</h3>
                <ArrowUpRight
                  className="transition group-hover:translate-x-1 group-hover:-translate-y-1"
                  size={22}
                />
              </div>
              <p className="text-xs text-brand-ink/60">{product.spec}</p>
            </div>
          </div>
        </article>
      )
    }

    if (variant === 'category') {
      return (
        <article className="group flex h-full min-h-[360px] flex-col bg-gradient-to-br from-[#c7d3d2] via-[#eef1eb] to-[#84949a] p-5">
          <div className="flex justify-between font-mono text-xs text-brand-ink/55">
            <span>{label}</span>
            <ArrowUpRight size={18} />
          </div>
          {hero ? (
            <img
              src={hero}
              alt={product.name}
              className="mx-auto mt-12 h-64 w-64 rounded-[2px] object-contain transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="mx-auto mt-12 h-44 w-24 rotate-[17deg] rounded-[45%] border-[5px] border-[#64747b]/60 bg-gradient-to-r from-white/70 via-[#84979c] to-white/70 shadow-xl transition group-hover:rotate-[24deg] group-hover:scale-105">
              <div className="mx-auto mt-12 h-1 w-4/5 bg-[#5b6b70]/70" />
              <div className="mx-auto mt-16 h-1 w-4/5 bg-[#5b6b70]/70" />
            </div>
          )}
          <h2 className="mt-8 text-3xl tracking-[-0.06em]">{product.name}</h2>
          <p className="mt-2 text-xs text-brand-ink/60">Алюминий 6063 · паспорт изделия</p>
        </article>
      )
    }

    return (
      <article className="group flex h-full min-h-[410px] flex-col justify-between bg-brand-surface-3 p-6 text-white">
        <div className="flex justify-between font-mono text-xs text-white/45">
          <span>{product.code}</span>
          <span>{product.category}</span>
        </div>
        {hero ? (
          <img
            src={hero}
            alt={product.name}
            className="mx-auto my-8 h-64 w-64 rounded-[2px] object-contain transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`mx-auto my-8 h-44 w-24 rotate-12 rounded-[48%] border-[5px] border-[#b4c1c4] bg-gradient-to-r ${product.tone} transition duration-500 group-hover:rotate-[22deg] group-hover:scale-110`}
          />
        )}
        <div>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl tracking-[-0.06em]">{product.name}</h2>
            <ArrowUpRight className="shrink-0 text-brand-lime transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
          <p className="mt-2 text-sm text-white/50">{product.description}</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-brand-lime">
            <span>{product.spec}</span>
            <span>{product.material}</span>
          </div>
        </div>
      </article>
    )
  })()

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={openQuickView}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            openQuickView()
          }
        }}
        className={`h-full cursor-pointer ${featured ? 'md:row-span-2' : ''}`}
        aria-label={`Посмотреть товар: ${product.name}`}
      >
        {card}
      </div>
      {quickViewOpen && (
        <ProductQuickView product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  )
}
