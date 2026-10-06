'use client'

import { useState } from 'react'

export function ProductGallery({
  images,
  tone,
  name,
}: {
  images: string[]
  tone: string
  name: string
}) {
  const [active, setActive] = useState(0)

  return (
    <div>
      <div
        className={`flex aspect-square items-center justify-center bg-gradient-to-br ${tone} p-10`}
      >
        {images[active] ? (
          <img
            src={images[active]}
            alt={name}
            className="max-h-full max-w-full rounded-[2px] object-cover"
          />
        ) : (
          <div className="h-64 w-36 rotate-12 rounded-[48%] border-[6px] border-[#b4c1c4] bg-gradient-to-r from-white/70 via-[#8799a0] to-white/70">
            <div className="mx-auto mt-20 h-1 w-4/5 bg-[#65747b]/70" />
            <div className="mx-auto mt-7 h-1 w-4/5 bg-[#65747b]/70" />
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => setActive(index)}
              className={`aspect-square overflow-hidden rounded-[2px] border transition ${
                index === active
                  ? 'border-brand-ink'
                  : 'border-brand-border opacity-60 hover:opacity-100'
              }`}
            >
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
