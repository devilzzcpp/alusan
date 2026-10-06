import { LoginForm } from '@/components/admin/login-form'
import { SiteBrand } from '@/components/site-brand'

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-brand-paper-alt px-5 text-brand-ink">
      <div className="w-full max-w-sm rounded-xl border border-brand-border bg-white p-8">
        <div className="mb-8">
          <SiteBrand />
        </div>
        <h1 className="mb-1 text-2xl font-medium tracking-[-0.04em]">Вход в админку</h1>
        <p className="mb-6 text-sm text-brand-muted-faint">Доступ только для администратора</p>
        <LoginForm />
      </div>
    </main>
  )
}
