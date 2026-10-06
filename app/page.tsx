import { ArrowUpRight, FileText, MoveUpRight, Search, ShieldCheck } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { HomeHeader } from '@/components/home-header'
import { Container } from '@/components/container'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ProductCard } from '@/components/product-card'
import { LeadForm } from '@/components/lead-form'
import { getProductsByNames } from '@/lib/products'
import { getSiteSettings, telHref } from '@/lib/settings'
import { getAllDocuments } from '@/lib/documents'
import { DocumentThumbnail } from '@/components/document-thumbnail'
import { submitLead } from '@/lib/actions/leads'

// Читает БД (товары, настройки) — без этого Next попытался бы отрендерить
// страницу статически при `next build`, что требует живой БД в момент сборки
// (при сборке Docker-образа её ещё нет). Контакты и так меняются через
// /admin, так что кешировать тут особо нечего.
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const [homeProducts, settings, documents] = await Promise.all([
    getProductsByNames(['Лестница трансформер', 'Стремянка высокая', 'Вышка мобильная']),
    getSiteSettings(),
    getAllDocuments(),
  ])
  const featuredDocuments = documents.slice(0, 3)

  return (
    <main className="min-h-screen overflow-hidden bg-brand-paper text-brand-ink">
      <HomeHeader />

      <section
        id="top"
        className="relative flex min-h-[820px] items-end overflow-hidden bg-brand-surface-2 pt-28 text-white lg:min-h-[940px]"
      >
        <img
          src="/hero-ladders.jpg"
          alt="Алюминиевая лестница в архитектурном пространстве"
          className="absolute inset-0 size-full object-cover object-[80%_center] opacity-65"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,15,.96),rgba(8,12,15,.58)_42%,rgba(8,12,15,.12)),linear-gradient(0deg,rgba(8,12,15,.78),transparent_55%)]" />
        <Container className="relative w-full pb-20 lg:pb-28">
          <SectionEyebrow className="mb-10 text-white/70">
            Инженерные решения для высоты
          </SectionEyebrow>
          <h1 className="max-w-5xl text-[clamp(3.5rem,8vw,7.5rem)] leading-[.9] tracking-[-.04em]">
            Высота
            <br />
            <span className="text-brand-lime">нового</span> уровня.
          </h1>
          <div className="mt-10 flex max-w-2xl flex-col justify-between gap-8 border-t border-white/20 pt-5 text-sm text-white/70 sm:flex-row">
            <p className="max-w-sm leading-relaxed">
              Лестничные системы, которые выглядят как инженерия будущего. Спроектированы для тех,
              кто ценит форму не меньше функции.
            </p>
            <a
              href="#solutions"
              className="group flex items-center gap-3 self-start font-semibold uppercase tracking-[0.16em] text-white"
            >
              Исследовать решения{' '}
              <span className="grid size-11 place-items-center rounded-full bg-brand-lime text-brand-ink transition group-hover:rotate-45">
                <MoveUpRight size={17} />
              </span>
            </a>
          </div>
        </Container>
        <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(201,255,61,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(201,255,61,.12)_1px,transparent_1px)] [background-size:80px_80px] [mask-image:linear-gradient(to_bottom,transparent,black_35%,transparent)]" />
        <div className="absolute bottom-7 right-6 hidden font-mono text-[10px] text-white/40 lg:block">
          Производство: {settings.city}
        </div>
      </section>

      <section id="solutions" className="py-24 lg:py-36">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <SectionEyebrow className="mb-5 text-brand-muted">Коллекция изделий</SectionEyebrow>
              <h2 className="heading-2 max-w-3xl">
                Конструкции,
                <br />
                <span className="text-brand-muted-faintest">которые работают.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-brand-muted-dim">
              От компактной стремянки до полноценной рабочей вышки. Один визуальный язык, сотни
              сценариев.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {homeProducts.map((product) => (
              <ProductCard key={product.name} product={product} variant="teaser" />
            ))}
          </div>
        </Container>
      </section>

      <section id="system" className="bg-brand-paper-alt py-24 text-brand-ink lg:py-32">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <SectionEyebrow className="mb-5 text-brand-muted">
                Инженерная система АЛЮСАН
              </SectionEyebrow>
              <h2 className="heading-2 max-w-xl">
                Не просто
                <br />
                <span className="text-brand-muted-faintest">лестница.</span>
              </h2>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-brand-muted-dim">
                alusan — молодая, динамично развивающаяся компания, которая делает ставку на
                передовые технологии и свежий подход к производству.
              </p>
              <a
                href="#about"
                className="mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue"
              >
                Как мы это делаем <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border border-brand-border bg-white p-6 sm:col-span-2">
                <div className="mb-24 flex justify-between font-mono text-xs text-brand-muted-faintest">
                  <span>Точность</span>
                  <span>Точность</span>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-6xl font-medium tracking-[-0.08em]">
                      Высокая <span className="text-brand-blue">точность</span>
                    </div>
                    <p className="mt-2 text-xs text-brand-muted-faintest">
                      точность сварного соединения
                    </p>
                  </div>
                  <ShieldCheck className="text-brand-blue" size={33} />
                </div>
              </div>
              <div className="border border-brand-border bg-white p-6">
                <div className="mb-16 font-mono text-xs text-brand-muted-faintest">Материал</div>
                <div className="text-4xl font-medium tracking-[-0.07em]">
                  Алюминий
                  <br />
                  <span className="text-brand-blue">авиационный сплав</span>
                </div>
                <p className="mt-4 text-xs text-brand-muted-faintest">авиационный алюминий</p>
              </div>
              <div className="border border-brand-border bg-white p-6">
                <div className="mb-16 font-mono text-xs text-brand-muted-faintest">Гарантия</div>
                <div className="text-4xl font-medium tracking-[-0.07em]">
                  Десять <span className="text-brand-blue">лет</span>
                </div>
                <p className="mt-4 text-xs text-brand-muted-faintest">гарантия на конструкцию</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section
        id="about"
        className="relative isolate flex min-h-[480px] items-end overflow-hidden border-b border-brand-border bg-brand-blue-dark py-20 text-white lg:min-h-[560px] lg:py-28"
      >
        <img
          src="/production-assembly.jpg"
          alt="Сборка алюминиевых лестниц на производстве"
          className="absolute inset-0 -z-20 size-full object-cover object-[75%_center] opacity-80"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,58,107,.92),rgba(3,58,107,.55)_45%,rgba(3,58,107,.18)),linear-gradient(0deg,rgba(3,58,107,.8),transparent_55%)]" />
        <Container className="relative flex w-full flex-col gap-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionEyebrow className="mb-5 text-brand-lime">О производстве</SectionEyebrow>
            <h2 className="heading-2 max-w-3xl">
              Сделано
              <br />в России.
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-snug text-white/80">
            Используем высокоточное оборудование европейского уровня: автоматизация процессов
            позволяет добиваться стабильно высокого качества без влияния человеческого фактора.
          </p>
        </Container>
      </section>

      <section className="bg-brand-paper py-20 lg:py-28">
        <Container>
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <SectionEyebrow className="mb-5 text-brand-muted">
                Документы и гарантии
              </SectionEyebrow>
              <h2 className="heading-2">
                Подтверждено
                <br />
                <span className="text-brand-muted-faintest">документами.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-brand-muted-dim">
              Сертификаты и протоколы на материалы и готовые изделия.
            </p>
          </div>
          {featuredDocuments.length > 0 && (
            <div className="grid gap-3 md:grid-cols-3">
              {featuredDocuments.map((document) => (
                <a
                  key={document.id}
                  href={document.fileUrl ?? '/documents'}
                  target={document.fileUrl ? '_blank' : undefined}
                  rel={document.fileUrl ? 'noreferrer' : undefined}
                  className="group block border border-brand-border bg-white p-6 transition hover:border-brand-border-strong"
                >
                  <span className="font-mono text-xs text-brand-muted-faintest">
                    {document.category}
                  </span>
                  <h3 className="mt-3 text-2xl tracking-[-0.05em]">{document.title}</h3>
                  <p className="mt-3 text-sm text-brand-muted-dim">{document.subtitle}</p>
                  {document.fileUrl ? (
                    <div className="mx-auto mt-6 w-full max-w-64">
                      <DocumentThumbnail fileUrl={document.fileUrl} alt={document.title} />
                    </div>
                  ) : (
                    <span className="mt-6 grid size-10 place-items-center rounded-full bg-brand-paper-alt text-brand-muted transition group-hover:bg-brand-lime/15">
                      <FileText size={18} />
                    </span>
                  )}
                </a>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section id="contacts" className="bg-brand-paper py-24 lg:py-32">
        <Container>
          <div className="mb-16 flex justify-between">
            <div>
              <SectionEyebrow className="mb-5 text-brand-muted">Связаться с нами</SectionEyebrow>
              <h2 className="heading-2">Начнём?</h2>
            </div>
            <Search className="hidden text-brand-border-strong sm:block" size={44} />
          </div>
          <div className="grid gap-12 border-t border-brand-border pt-7 md:grid-cols-3">
            <div>
              <p className="mb-3 text-xs text-brand-muted-faintest">Отдел продаж</p>
              <a
                href={telHref(settings.phone)}
                className="text-2xl tracking-[-0.05em] transition hover:text-brand-muted"
              >
                {settings.phone}
              </a>
            </div>
            <div>
              <p className="mb-3 text-xs text-brand-muted-faintest">Почта</p>
              <a
                href={`mailto:${settings.email}`}
                className="text-2xl tracking-[-0.05em] transition hover:text-brand-muted"
              >
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
        </Container>
      </section>
      <section id="request" className="bg-brand-blue-dark py-20 text-white lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <SectionEyebrow className="mb-5 text-brand-lime">Персональный подбор</SectionEyebrow>
            <h2 className="heading-2 max-w-xl">
              Рассчитаем
              <br />
              вашу задачу.
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-white/80">
              Оставьте контакты — уточним сценарий использования и подберём подходящую модель.
            </p>
          </div>
          <LeadForm
            tone="onBlue"
            submitLabel="Отправить заявку"
            sentLabel="Заявка отправлена, скоро свяжемся."
            note="Нажимая кнопку, вы соглашаетесь на обработку персональных данных."
            action={submitLead.bind(null, 'homepage')}
            fields={[
              { type: 'text', name: 'name', label: 'Ваше имя', required: true },
              { type: 'tel', name: 'phone', label: 'Телефон', required: true },
              {
                type: 'select',
                name: 'type',
                label: 'Тип задачи',
                placeholder: 'Выберите решение',
                options: ['Стремянка для дома', 'Лестница для бизнеса', 'Профессиональная вышка'],
                span: 2,
              },
            ]}
          />
        </Container>
      </section>

      <SiteFooter />
    </main>
  )
}
