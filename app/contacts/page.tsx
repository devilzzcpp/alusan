import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { LeadForm } from '@/components/lead-form'

export default function ContactsPage() {
  return (
    <main className="min-h-screen bg-brand-paper text-brand-ink">
      <SiteHeader backHref="/" backLabel="На главную" />
      <section className="py-24 lg:py-32">
        <Container>
          <SectionEyebrow className="mb-5 text-brand-muted">КОНТАКТЫ</SectionEyebrow>
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
              <a href="tel:+77777777777" className="text-2xl tracking-[-0.05em]">
                +7 777 777-77-77
              </a>
            </div>
            <div>
              <p className="mb-3 text-xs text-brand-muted-faintest">Почта</p>
              <a href="mailto:hello@alusan.ru" className="text-2xl tracking-[-0.05em]">
                hello@alusan.ru
              </a>
            </div>
            <div>
              <p className="mb-3 text-xs text-brand-muted-faintest">Производство</p>
              <p className="text-lg">
                Ростов-на-Дону
                <br />
                ул. Производственная, 7
              </p>
            </div>
          </div>
          <div className="mt-20 grid gap-12 border-t border-brand-border pt-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <SectionEyebrow className="text-brand-muted">СВЯЖИТЕСЬ С НАМИ</SectionEyebrow>
              <p className="mt-6 max-w-sm text-2xl leading-tight">
                Менеджер поможет выбрать модель, рассчитать заказ или подготовить условия
                сотрудничества.
              </p>
            </div>
            <LeadForm
              submitLabel="Отправить запрос"
              sentLabel="Заявка отправлена"
              note="Демо-форма: подключим сохранение заявок и уведомления в рабочей версии."
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
