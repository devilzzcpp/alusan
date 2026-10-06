/** @type {import('next').NextConfig} */
const nextConfig = {
  // Минимальный standalone-билд для Docker — только нужные файлы/зависимости,
  // не весь node_modules. См. workflows/деплой.md.
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      // Дефолт 1MB слишком мал для загрузки фото товаров/PDF документов
      // (храним файлы в БД, см. lib/assets.ts) — даём запас под оба лимита.
      bodySizeLimit: '20mb',
    },
  },
}

export default nextConfig
