'use client'

import { useEffect, useRef, useState } from 'react'
import { FileText } from 'lucide-react'

type Status = 'loading' | 'image' | 'pdf' | 'error'

export function DocumentThumbnail({ fileUrl, alt }: { fileUrl: string; alt: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [status, setStatus] = useState<Status>('loading')
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      try {
        const response = await fetch(fileUrl)
        const contentType = response.headers.get('content-type') ?? ''

        if (contentType.startsWith('image/')) {
          if (!cancelled) {
            setImageSrc(fileUrl)
            setStatus('image')
          }
          return
        }

        if (contentType === 'application/pdf') {
          const buffer = await response.arrayBuffer()
          const pdfjs = await import('pdfjs-dist')
          pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`

          const pdf = await pdfjs.getDocument({ data: buffer }).promise
          const page = await pdf.getPage(1)
          // Рендерим с запасом по разрешению относительно размера превью на
          // странице (см. use-сайты) — иначе текст на сканах документов
          // шакалится при сжатии мелкого шрифта в маленькую картинку.
          const viewport = page.getViewport({ scale: 2.5 })
          const canvas = canvasRef.current
          if (!canvas || cancelled) return

          canvas.width = viewport.width
          canvas.height = viewport.height
          const context = canvas.getContext('2d')
          if (!context) return

          await page.render({ canvasContext: context, viewport, canvas }).promise
          if (!cancelled) setStatus('pdf')
          return
        }

        if (!cancelled) setStatus('error')
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    render()
    return () => {
      cancelled = true
    }
  }, [fileUrl])

  if (status === 'error') {
    return (
      <span className="grid size-10 place-items-center rounded-full bg-brand-paper-alt text-brand-muted">
        <FileText size={18} />
      </span>
    )
  }

  return (
    <div className="relative aspect-[1/1.3] w-full overflow-hidden rounded-[2px] border border-brand-border bg-brand-paper-alt">
      {status === 'loading' && (
        <div className="absolute inset-0 animate-pulse bg-brand-paper-alt" />
      )}
      {status === 'image' && imageSrc && (
        <img src={imageSrc} alt={alt} className="h-full w-full object-cover" />
      )}
      <canvas
        ref={canvasRef}
        className={`h-full w-full object-contain ${status === 'pdf' ? '' : 'hidden'}`}
      />
    </div>
  )
}
