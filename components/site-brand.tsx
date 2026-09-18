import Link from 'next/link'

export function SiteBrand({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 ${dark ? 'text-white' : 'text-[#15171a]'}`}
      aria-label="alusan — на главную"
    >
      <span className="grid size-9 place-items-center rounded-full bg-[#c9ff3d] p-1.5 text-[#15171a]">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ladder_6196850-48MvlhtQlModXcOdVuz8iQI5uFXqcw.png"
          alt="Логотип alusan"
          className="size-full object-contain"
        />
      </span>
      <span className="font-mono text-lg font-bold tracking-[-0.08em]">alusan</span>
    </Link>
  )
}
