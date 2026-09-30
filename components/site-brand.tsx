import Link from 'next/link'

export function SiteBrand({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center" aria-label="АЛЮСАН — на главную">
      <img
        src={dark ? '/brand/logo-white.svg' : '/brand/logo.svg'}
        alt="АЛЮСАН"
        className="h-9 w-auto"
      />
    </Link>
  )
}
