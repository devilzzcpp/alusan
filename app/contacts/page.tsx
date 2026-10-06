import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { LeadForm } from '@/components/lead-form'
import { getSiteSettings, telHref } from '@/lib/settings'
import { submitLead } from '@/lib/actions/leads'

// См. комментарий в app/page.tsx — читает БД, без force-dynamic не соберётся
// Docker-образ (на моменте `next build` ещё нет живой БД).
export const dynamic = 'force-dynamic'

export default async function ContactsPage() {
  const settings = await getSiteSettings()

  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader backHref="/" backLabel="На главную" />
      <section className="py-24 lg:py-32">
        <Container>
          <SectionEyebrow className="mb-5 text-brand-muted">Контакты</SectionEyebrow>
          <h1 className="heading-1 max-w-5xl">
            Давайте
            <br />
            <span className="text-brand-muted-faintest">обсудим</span>
            <br />
            задачу.
          </h1>
          <div className="mt-20 grid gap-12 border-t border-brand-border pt-7 md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs text-brand-muted-faintest">Отдел продаж</p>
              <a href={telHref(settings.phone)} className="text-2xl tracking-[-0.05em]">
                {settings.phone}
              </a>
            </div>
            <div>
              <p className="mb-3 text-xs text-brand-muted-faintest">Почта</p>
              <a href={`mailto:${settings.email}`} className="text-2xl tracking-[-0.05em]">
                {settings.email}
              </a>
            </div>
            <div>
              <p className="mb-3 text-xs text-brand-muted-faintest">Производство</p>
              <p className="text-lg">
                {settings.city}
                <br />
                {settings.address}
              </p>
            </div>
          </div>
          <div className="mt-20 grid gap-12 border-t border-brand-border pt-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionEyebrow className="text-brand-muted">Свяжитесь с нами</SectionEyebrow>
              <p className="mt-6 max-w-sm text-2xl leading-tight">
                Менеджер поможет выбрать модель, рассчитать заказ или подготовить условия
                сотрудничества.
              </p>
            </div>
            <LeadForm
              submitLabel="Отправить запрос"
              sentLabel="Заявка отправлена, скоро свяжемся."
              note="Нажимая кнопку, вы соглашаетесь на обработку персональных данных."
              action={submitLead.bind(null, 'contacts')}
              fields={[
                { type: 'text', name: 'name', label: 'ФИО', required: true },
                { type: 'tel', name: 'phone', label: 'Телефон', required: true },
                { type: 'email', name: 'email', label: 'Email', span: 2 },
                { type: 'textarea', name: 'comment', label: 'Комментарий', span: 2 },
              ]}
            />
          </div>
        </Container>
      </section>
      <SiteFooter />
    </main>
  )
}
