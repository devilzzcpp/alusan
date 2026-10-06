import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono, Manrope } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-body',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500'],
  variable: '--font-mono-brand',
})

export const metadata: Metadata = {
  title: 'ALUSAN — Инженерные решения для высоты',
  description: 'Премиальные лестничные системы и алюминиевые конструкции нового поколения.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

// Сайт спроектирован только в светлой теме (см. редизайн фазы 1) — тёмная
// половина досталась от исходного v0/shadcn-шаблона и никогда не была
// частью дизайна. `colorScheme: 'light dark'` заставлял браузер в тёмной
// системной теме подставлять свою тёмную тему для нативных элементов формы
// (инпуты/селекты/скроллбары) поверх наших светлых стилей — источник серии
// багов "текст сливается с фоном". Зафиксировали `'light'` — браузер больше
// не подставляет тёмную тему независимо от настроек ОС пользователя.
export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: 'white',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
