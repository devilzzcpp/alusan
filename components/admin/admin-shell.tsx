'use client'

import Link from 'next/link'
import { SiteBrand } from '@/components/site-brand'
import {
  ArrowLeft,
  Box,
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { useActionState, useEffect, useRef, useState, useTransition } from 'react'
import type { AdminRole, ArticleStatus, LeadStatus } from '@prisma/client'
import type { Lead } from '@/lib/leads'
import type { SiteSettings } from '@/lib/settings'
import type { AdminProduct, Category } from '@/lib/products'
import type { AdminArticle } from '@/lib/articles'
import type { Document } from '@/lib/documents'
import type { CurrentAdmin } from '@/lib/current-admin'
import type { AdminSummary } from '@/lib/admins'
import { updateLeadStatus } from '@/lib/actions/leads'
import { updateSiteSettings } from '@/lib/actions/settings'
import { logout } from '@/lib/actions/auth'
import { updateProfile } from '@/lib/actions/profile'
import { createManager, deleteManager } from '@/lib/actions/admins'
import { createCategory, updateCategory, deleteCategory } from '@/lib/actions/categories'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  removeProductImage,
} from '@/lib/actions/products'
import { createArticle, updateArticle, deleteArticle } from '@/lib/actions/articles'
import { createDocument, updateDocument, deleteDocument } from '@/lib/actions/documents'
import { ChangePasswordForm } from '@/components/admin/change-password-form'
import { TONE_OPTIONS } from '@/lib/product-tones'
import { DOCUMENT_COLOR_OPTIONS } from '@/lib/document-colors'
import { DOCUMENT_CATEGORIES } from '@/lib/documents'

const baseTabs = [
  { key: 'overview', label: 'Обзор', icon: LayoutDashboard },
  { key: 'catalog', label: 'Каталог', icon: Box },
  { key: 'content', label: 'Контент', icon: FileText },
  { key: 'leads', label: 'Заявки', icon: Users },
  { key: 'settings', label: 'Настройки', icon: Settings },
  { key: 'profile', label: 'Профиль', icon: User },
] as const

const ownerTab = { key: 'users', label: 'Пользователи', icon: UserPlus } as const

type Tab = (typeof baseTabs)[number]['key'] | typeof ownerTab.key

type AdminShellProps = {
  currentAdmin: CurrentAdmin
  leads: Lead[]
  settings: SiteSettings
  products: AdminProduct[]
  categories: Category[]
  articles: AdminArticle[]
  documents: Document[]
  admins: AdminSummary[]
}

export function AdminShell({
  currentAdmin,
  leads,
  settings,
  products,
  categories,
  articles,
  documents,
  admins,
}: AdminShellProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const tabs = currentAdmin.role === 'owner' ? [...baseTabs, ownerTab] : baseTabs
  const initial = (currentAdmin.firstName ?? currentAdmin.email).charAt(0).toUpperCase()

  return (
    <main className="min-h-screen bg-brand-paper-alt text-brand-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-brand-border bg-brand-surface-2 p-6 text-white lg:flex">
        <div className="mb-16">
          <SiteBrand dark />
        </div>
        <p className="mb-4 font-mono text-xs text-white/35">Рабочее пространство</p>
        <nav className="flex flex-1 flex-col gap-2 text-sm">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = tab.key === activeTab
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left transition ${
                  active ? 'bg-white/10 text-brand-lime' : 'text-white/55 hover:text-white/80'
                }`}
              >
                <Icon size={17} /> {tab.label}
              </button>
            )
          })}
        </nav>
        <form action={logout}>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-white/55 transition hover:text-white/80">
            <LogOut size={17} /> Выйти
          </button>
        </form>
      </aside>
      <div className="lg:ml-64">
        <header className="flex h-20 items-center justify-between border-b border-brand-border bg-white px-5 sm:px-10">
          <div>
            <Link href="/" className="mb-1 flex items-center gap-2 text-xs text-brand-muted-dim">
              <ArrowLeft size={14} /> На сайт
            </Link>
            <h1 className="text-xl font-medium tracking-[-0.04em]">
              Добрый день{currentAdmin.firstName ? `, ${currentAdmin.firstName}` : ''}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-full bg-brand-lime font-semibold text-brand-lime-ink">
              {initial}
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg border border-brand-border p-2.5 text-brand-ink lg:hidden"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </header>
        {menuOpen && (
          <div className="border-b border-brand-border bg-brand-surface-2 px-5 py-6 text-white lg:hidden">
            <nav className="flex flex-col gap-2 text-sm">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const active = tab.key === activeTab
                return (
                  <button
                    key={tab.key}
                    onClick={() => {
                      setActiveTab(tab.key)
                      setMenuOpen(false)
                    }}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-left transition ${
                      active ? 'bg-white/10 text-brand-lime' : 'text-white/55 hover:text-white/80'
                    }`}
                  >
                    <Icon size={17} /> {tab.label}
                  </button>
                )
              })}
            </nav>
            <form action={logout} className="mt-2 border-t border-white/10 pt-2">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-white/55 transition hover:text-white/80">
                <LogOut size={17} /> Выйти
              </button>
            </form>
          </div>
        )}
        <div className="p-5 sm:p-10">
          {activeTab === 'overview' && <OverviewTab leads={leads} products={products} />}
          {activeTab === 'catalog' && <CatalogTab products={products} categories={categories} />}
          {activeTab === 'content' && <ContentTab articles={articles} documents={documents} />}
          {activeTab === 'leads' && <LeadsTab leads={leads} />}
          {activeTab === 'settings' && <SettingsTab settings={settings} />}
          {activeTab === 'profile' && <ProfileTab currentAdmin={currentAdmin} />}
          {activeTab === 'users' && currentAdmin.role === 'owner' && (
            <UsersTab admins={admins} currentAdminId={currentAdmin.id} />
          )}
        </div>
      </div>
    </main>
  )
}

function TabHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow: string
  title: string
  action?: React.ReactNode
}) {
  return (
    <div className="mb-9 flex items-end justify-between">
      <div>
        <p className="mb-2 font-mono text-xs text-brand-muted">/ {eyebrow}</p>
        <h2 className="text-4xl font-medium tracking-[-0.07em]">{title}</h2>
      </div>
      {action}
    </div>
  )
}

function OverviewTab({ leads, products }: { leads: Lead[]; products: AdminProduct[] }) {
  const newLeads = leads.filter((lead) => lead.status === 'new').length

  return (
    <>
      <TabHeading eyebrow="Обзор" title="Сводка проекта" />
      <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Заявок всего"
          value={String(leads.length)}
          change={`${newLeads} новых`}
          icon={<Users size={19} />}
        />
        <Stat
          title="Товаров в каталоге"
          value={String(products.length)}
          change=""
          icon={<Box size={19} />}
        />
      </div>
      <ProductsTable products={products.slice(0, 6)} />
    </>
  )
}

function CatalogTab({
  products,
  categories,
}: {
  products: AdminProduct[]
  categories: Category[]
}) {
  return (
    <>
      <TabHeading eyebrow="Каталог" title="Товары и категории" />
      <CategoriesPanel categories={categories} />
      <div className="mt-10">
        <ProductsPanel products={products} categories={categories} />
      </div>
    </>
  )
}

function CategoriesPanel({ categories }: { categories: Category[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const editing = categories.find((category) => category.id === editingId) ?? null

  return (
    <section>
      <h3 className="mb-4 font-medium">Категории</h3>
      <div className="mb-6 overflow-hidden rounded-xl border border-brand-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-brand-paper-alt text-[10px] uppercase tracking-[0.16em] text-brand-muted-faint">
              <tr>
                <th className="px-7 py-4 font-medium">Название</th>
                <th className="px-7 py-4 font-medium">Slug</th>
                <th className="px-7 py-4 font-medium">Порядок</th>
                <th className="px-7 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  isEditing={category.id === editingId}
                  onEdit={() => setEditingId(category.id)}
                  onCancelEdit={() => setEditingId(null)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <CategoryForm
        key={editing?.id ?? 'new'}
        category={editing}
        onDone={() => setEditingId(null)}
      />
    </section>
  )
}

function CategoryRow({
  category,
  isEditing,
  onEdit,
  onCancelEdit,
}: {
  category: Category
  isEditing: boolean
  onEdit: () => void
  onCancelEdit: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  return (
    <tr className={`border-t border-brand-border ${isEditing ? 'bg-brand-paper-alt' : ''}`}>
      <td className="px-7 py-5 font-medium">{category.title}</td>
      <td className="px-7 py-5 font-mono text-xs text-brand-muted-dim">{category.slug}</td>
      <td className="px-7 py-5 text-brand-muted-dim">{category.order}</td>
      <td className="px-7 py-5 text-right">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={isEditing ? onCancelEdit : onEdit}
            className="text-xs text-brand-blue hover:underline"
          >
            {isEditing ? 'Отмена' : 'Изменить'}
          </button>
          <button
            disabled={isPending}
            onClick={() => {
              if (!confirm(`Удалить категорию «${category.title}»?`)) return
              startTransition(async () => {
                const result = await deleteCategory(category.id)
                if (!result.ok) setError(result.error ?? 'Не удалось удалить')
              })
            }}
            className="text-xs text-red-600 hover:underline disabled:opacity-50"
          >
            Удалить
          </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </td>
    </tr>
  )
}

function CategoryForm({ category, onDone }: { category: Category | null; onDone: () => void }) {
  const action = category ? updateCategory.bind(null, category.id) : createCategory
  const [state, formAction, isPending] = useActionState(action, { ok: false })
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.ok) {
      if (category) {
        onDone()
      } else {
        formRef.current?.reset()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ok])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="max-w-2xl rounded-xl border border-brand-border bg-white p-7"
    >
      <h4 className="mb-5 font-medium">
        {category ? `Изменить категорию: ${category.title}` : 'Добавить категорию'}
      </h4>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Название" name="title" defaultValue={category?.title ?? ''} />
        <Field label="Slug (для URL)" name="slug" defaultValue={category?.slug ?? ''} />
        <Field
          label="Порядок"
          name="order"
          type="number"
          defaultValue={String(category?.order ?? 0)}
        />
        <Field label="Описание" name="description" defaultValue={category?.description ?? ''} />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-brand-ink px-5 py-3 text-xs font-semibold text-white disabled:opacity-60"
        >
          {isPending ? 'Сохраняем…' : category ? 'Сохранить' : 'Добавить категорию'}
        </button>
        {category && (
          <button
            type="button"
            onClick={onDone}
            className="text-xs text-brand-muted-dim hover:underline"
          >
            Отмена
          </button>
        )}
      </div>
      {state.error && <p className="mt-3 text-xs text-red-600">{state.error}</p>}
    </form>
  )
}

function ProductsPanel({
  products,
  categories,
}: {
  products: AdminProduct[]
  categories: Category[]
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const editing = products.find((product) => product.id === editingId) ?? null

  return (
    <section>
      <h3 className="mb-4 font-medium">Товары</h3>
      <div className="mb-6 overflow-hidden rounded-xl border border-brand-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-brand-paper-alt text-[10px] uppercase tracking-[0.16em] text-brand-muted-faint">
              <tr>
                <th className="px-7 py-4 font-medium">Артикул</th>
                <th className="px-7 py-4 font-medium">Название</th>
                <th className="px-7 py-4 font-medium">Категория</th>
                <th className="px-7 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  isEditing={product.id === editingId}
                  onEdit={() => setEditingId(product.id)}
                  onCancelEdit={() => setEditingId(null)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ProductForm
        key={editing?.id ?? 'new'}
        product={editing}
        categories={categories}
        onDone={() => setEditingId(null)}
      />
    </section>
  )
}

function ProductRow({
  product,
  isEditing,
  onEdit,
  onCancelEdit,
}: {
  product: AdminProduct
  isEditing: boolean
  onEdit: () => void
  onCancelEdit: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  return (
    <tr className={`border-t border-brand-border ${isEditing ? 'bg-brand-paper-alt' : ''}`}>
      <td className="px-7 py-5 font-mono text-xs">{product.code}</td>
      <td className="px-7 py-5 font-medium">{product.name}</td>
      <td className="px-7 py-5 text-brand-muted-dim">{product.category}</td>
      <td className="px-7 py-5 text-right">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={isEditing ? onCancelEdit : onEdit}
            className="text-xs text-brand-blue hover:underline"
          >
            {isEditing ? 'Отмена' : 'Изменить'}
          </button>
          <button
            disabled={isPending}
            onClick={() => {
              if (!confirm(`Удалить товар «${product.name}»?`)) return
              startTransition(async () => {
                const result = await deleteProduct(product.id)
                if (!result.ok) setError(result.error ?? 'Не удалось удалить')
              })
            }}
            className="text-xs text-red-600 hover:underline disabled:opacity-50"
          >
            Удалить
          </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </td>
    </tr>
  )
}

function ProductForm({
  product,
  categories,
  onDone,
}: {
  product: AdminProduct | null
  categories: Category[]
  onDone: () => void
}) {
  const action = product ? updateProduct.bind(null, product.id) : createProduct
  const [state, formAction, isPending] = useActionState(action, { ok: false })
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.ok) {
      if (product) {
        onDone()
      } else {
        formRef.current?.reset()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ok])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="max-w-2xl rounded-xl border border-brand-border bg-white p-7"
    >
      <h4 className="mb-5 font-medium">
        {product ? `Изменить товар: ${product.name}` : 'Добавить товар'}
      </h4>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Артикул" name="code" defaultValue={product?.code ?? ''} />
        <Field label="Название" name="name" defaultValue={product?.name ?? ''} />
        <Field label="Slug (для URL)" name="slug" defaultValue={product?.slug ?? ''} />
        <label className="block text-sm">
          <span className="mb-2 block text-xs font-medium text-brand-muted-dim">Категория</span>
          <select
            name="categoryId"
            defaultValue={product?.categoryId ?? categories[0]?.id ?? ''}
            className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
        <Field label="Материал" name="material" defaultValue={product?.material ?? ''} />
        <Field label="Характеристики" name="spec" defaultValue={product?.spec ?? ''} />
        <label className="block text-sm">
          <span className="mb-2 block text-xs font-medium text-brand-muted-dim">Цвет карточки</span>
          <select
            name="tone"
            defaultValue={product?.tone ?? TONE_OPTIONS[0].value}
            className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
          >
            {TONE_OPTIONS.map((tone) => (
              <option key={tone.value} value={tone.value}>
                {tone.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={product?.featured ?? false}
            className="size-4 rounded border-brand-border"
          />
          <span className="text-xs font-medium text-brand-muted-dim">Показывать на главной</span>
        </label>
      </div>
      <label className="mt-5 block text-sm">
        <span className="mb-2 block text-xs font-medium text-brand-muted-dim">Описание</span>
        <textarea
          name="description"
          defaultValue={product?.description ?? ''}
          rows={3}
          className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
        />
      </label>
      <div className="mt-5">
        {product && product.images.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-3">
            {product.images.map((url) => (
              <ExistingProductImage key={url} productId={product.id} url={url} />
            ))}
          </div>
        )}
        <label className="block text-sm">
          <span className="mb-2 block text-xs font-medium text-brand-muted-dim">
            Добавить фото (можно выбрать несколько)
          </span>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            className="w-full rounded-lg border border-brand-border bg-white px-3 py-2.5 text-xs text-brand-ink outline-none file:mr-3 file:rounded-full file:border-0 file:bg-brand-paper-alt file:px-3 file:py-1.5 file:text-xs file:font-medium focus:border-brand-blue"
          />
        </label>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-brand-ink px-5 py-3 text-xs font-semibold text-white disabled:opacity-60"
        >
          {isPending ? 'Сохраняем…' : product ? 'Сохранить' : 'Добавить товар'}
        </button>
        {product && (
          <button
            type="button"
            onClick={onDone}
            className="text-xs text-brand-muted-dim hover:underline"
          >
            Отмена
          </button>
        )}
      </div>
      {state.error && <p className="mt-3 text-xs text-red-600">{state.error}</p>}
    </form>
  )
}

function ExistingProductImage({ productId, url }: { productId: string; url: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="relative">
      <img
        src={url}
        alt=""
        className="size-16 rounded-lg border border-brand-border object-cover"
      />
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(() => {
            void removeProductImage(productId, url)
          })
        }
        aria-label="Удалить фото"
        className="absolute -right-1.5 -top-1.5 grid size-5 place-items-center rounded-full bg-brand-ink text-white disabled:opacity-50"
      >
        ×
      </button>
    </div>
  )
}

function ProductsTable({ products }: { products: AdminProduct[] }) {
  return (
    <section className="overflow-hidden rounded-xl border border-brand-border bg-white">
      <div className="flex items-center justify-between border-b border-brand-border px-5 py-5 sm:px-7">
        <div>
          <h3 className="font-medium">Каталог продукции</h3>
          <p className="mt-1 text-xs text-brand-muted-faint">{products.length} товаров в БД</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-left text-sm">
          <thead className="bg-brand-paper-alt text-[10px] uppercase tracking-[0.16em] text-brand-muted-faint">
            <tr>
              <th className="px-7 py-4 font-medium">Артикул</th>
              <th className="px-7 py-4 font-medium">Название</th>
              <th className="px-7 py-4 font-medium">Категория</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-brand-border">
                <td className="px-7 py-5 font-mono text-xs">{product.code}</td>
                <td className="px-7 py-5 font-medium">{product.name}</td>
                <td className="px-7 py-5 text-brand-muted-dim">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function ContentTab({ articles, documents }: { articles: AdminArticle[]; documents: Document[] }) {
  return (
    <>
      <TabHeading eyebrow="Контент" title="Статьи и документы" />
      <ArticlesPanel articles={articles} />
      <div className="mt-10">
        <DocumentsPanel documents={documents} />
      </div>
    </>
  )
}

const articleStatusLabel: Record<ArticleStatus, string> = {
  draft: 'Черновик',
  published: 'Опубликована',
}

const articleStatusClass: Record<ArticleStatus, string> = {
  draft: 'bg-brand-border text-brand-muted-dim',
  published: 'bg-brand-lime/20 text-brand-lime-ink',
}

function ArticlesPanel({ articles }: { articles: AdminArticle[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const editing = articles.find((article) => article.id === editingId) ?? null

  return (
    <section>
      <h3 className="mb-4 font-medium">Статьи</h3>
      <div className="mb-6 overflow-hidden rounded-xl border border-brand-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-brand-paper-alt text-[10px] uppercase tracking-[0.16em] text-brand-muted-faint">
              <tr>
                <th className="px-7 py-4 font-medium">Заголовок</th>
                <th className="px-7 py-4 font-medium">Slug</th>
                <th className="px-7 py-4 font-medium">Статус</th>
                <th className="px-7 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <ArticleRow
                  key={article.id}
                  article={article}
                  isEditing={article.id === editingId}
                  onEdit={() => setEditingId(article.id)}
                  onCancelEdit={() => setEditingId(null)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ArticleForm key={editing?.id ?? 'new'} article={editing} onDone={() => setEditingId(null)} />
    </section>
  )
}

function ArticleRow({
  article,
  isEditing,
  onEdit,
  onCancelEdit,
}: {
  article: AdminArticle
  isEditing: boolean
  onEdit: () => void
  onCancelEdit: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  return (
    <tr className={`border-t border-brand-border ${isEditing ? 'bg-brand-paper-alt' : ''}`}>
      <td className="px-7 py-5 font-medium">{article.title}</td>
      <td className="px-7 py-5 font-mono text-xs text-brand-muted-dim">{article.slug}</td>
      <td className="px-7 py-5">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-medium ${articleStatusClass[article.status]}`}
        >
          {articleStatusLabel[article.status]}
        </span>
      </td>
      <td className="px-7 py-5 text-right">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={isEditing ? onCancelEdit : onEdit}
            className="text-xs text-brand-blue hover:underline"
          >
            {isEditing ? 'Отмена' : 'Изменить'}
          </button>
          <button
            disabled={isPending}
            onClick={() => {
              if (!confirm(`Удалить статью «${article.title}»?`)) return
              startTransition(async () => {
                const result = await deleteArticle(article.id)
                if (!result.ok) setError(result.error ?? 'Не удалось удалить')
              })
            }}
            className="text-xs text-red-600 hover:underline disabled:opacity-50"
          >
            Удалить
          </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </td>
    </tr>
  )
}

function ArticleForm({ article, onDone }: { article: AdminArticle | null; onDone: () => void }) {
  const action = article ? updateArticle.bind(null, article.id) : createArticle
  const [state, formAction, isPending] = useActionState(action, { ok: false })
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.ok) {
      if (article) {
        onDone()
      } else {
        formRef.current?.reset()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ok])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="max-w-2xl rounded-xl border border-brand-border bg-white p-7"
    >
      <h4 className="mb-5 font-medium">
        {article ? `Изменить статью: ${article.title}` : 'Добавить статью'}
      </h4>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Заголовок" name="title" defaultValue={article?.title ?? ''} />
        <Field label="Slug (для URL)" name="slug" defaultValue={article?.slug ?? ''} />
        <label className="block text-sm sm:col-span-2">
          <span className="mb-2 block text-xs font-medium text-brand-muted-dim">Статус</span>
          <select
            name="status"
            defaultValue={article?.status ?? 'draft'}
            className="w-full max-w-xs rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
          >
            <option value="draft">Черновик</option>
            <option value="published">Опубликована</option>
          </select>
        </label>
      </div>
      <label className="mt-5 block text-sm">
        <span className="mb-2 block text-xs font-medium text-brand-muted-dim">
          Краткое описание
        </span>
        <textarea
          name="excerpt"
          defaultValue={article?.excerpt ?? ''}
          rows={2}
          className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
        />
      </label>
      <label className="mt-5 block text-sm">
        <span className="mb-2 block text-xs font-medium text-brand-muted-dim">
          Текст статьи (Markdown, поддерживаются таблицы)
        </span>
        <textarea
          name="body"
          defaultValue={article?.body ?? ''}
          rows={10}
          className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 font-mono text-xs text-brand-ink outline-none focus:border-brand-blue"
        />
      </label>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-brand-ink px-5 py-3 text-xs font-semibold text-white disabled:opacity-60"
        >
          {isPending ? 'Сохраняем…' : article ? 'Сохранить' : 'Добавить статью'}
        </button>
        {article && (
          <button
            type="button"
            onClick={onDone}
            className="text-xs text-brand-muted-dim hover:underline"
          >
            Отмена
          </button>
        )}
      </div>
      {state.error && <p className="mt-3 text-xs text-red-600">{state.error}</p>}
    </form>
  )
}

function DocumentsPanel({ documents }: { documents: Document[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const editing = documents.find((document) => document.id === editingId) ?? null

  return (
    <section>
      <h3 className="mb-4 font-medium">Документы</h3>
      <div className="mb-6 overflow-hidden rounded-xl border border-brand-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-brand-paper-alt text-[10px] uppercase tracking-[0.16em] text-brand-muted-faint">
              <tr>
                <th className="px-7 py-4 font-medium">Название</th>
                <th className="px-7 py-4 font-medium">Раздел</th>
                <th className="px-7 py-4 font-medium">Файл</th>
                <th className="px-7 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <DocumentRow
                  key={document.id}
                  document={document}
                  isEditing={document.id === editingId}
                  onEdit={() => setEditingId(document.id)}
                  onCancelEdit={() => setEditingId(null)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <DocumentForm
        key={editing?.id ?? 'new'}
        document={editing}
        onDone={() => setEditingId(null)}
      />
    </section>
  )
}

function DocumentRow({
  document,
  isEditing,
  onEdit,
  onCancelEdit,
}: {
  document: Document
  isEditing: boolean
  onEdit: () => void
  onCancelEdit: () => void
}) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  return (
    <tr className={`border-t border-brand-border ${isEditing ? 'bg-brand-paper-alt' : ''}`}>
      <td className="px-7 py-5 font-medium">{document.title}</td>
      <td className="px-7 py-5 text-brand-muted-dim">{document.category}</td>
      <td className="px-7 py-5 text-xs text-brand-muted-faint">
        {document.fileUrl ? 'Есть' : 'Нет'}
      </td>
      <td className="px-7 py-5 text-right">
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={isEditing ? onCancelEdit : onEdit}
            className="text-xs text-brand-blue hover:underline"
          >
            {isEditing ? 'Отмена' : 'Изменить'}
          </button>
          <button
            disabled={isPending}
            onClick={() => {
              if (!confirm(`Удалить документ «${document.title}»?`)) return
              startTransition(async () => {
                const result = await deleteDocument(document.id)
                if (!result.ok) setError(result.error ?? 'Не удалось удалить')
              })
            }}
            className="text-xs text-red-600 hover:underline disabled:opacity-50"
          >
            Удалить
          </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </td>
    </tr>
  )
}

function DocumentForm({ document, onDone }: { document: Document | null; onDone: () => void }) {
  const action = document ? updateDocument.bind(null, document.id) : createDocument
  const [state, formAction, isPending] = useActionState(action, { ok: false })
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.ok) {
      if (document) {
        onDone()
      } else {
        formRef.current?.reset()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.ok])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="max-w-2xl rounded-xl border border-brand-border bg-white p-7"
    >
      <h4 className="mb-5 font-medium">
        {document ? `Изменить документ: ${document.title}` : 'Добавить документ'}
      </h4>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Название" name="title" defaultValue={document?.title ?? ''} />
        <Field label="Подзаголовок" name="subtitle" defaultValue={document?.subtitle ?? ''} />
        <label className="block text-sm">
          <span className="mb-2 block text-xs font-medium text-brand-muted-dim">Раздел</span>
          <select
            name="category"
            defaultValue={document?.category ?? DOCUMENT_CATEGORIES[0]}
            className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
          >
            {DOCUMENT_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Бейдж (Сертификат/Паспорт/Документ)"
          name="code"
          defaultValue={document?.code ?? ''}
        />
        <label className="block text-sm">
          <span className="mb-2 block text-xs font-medium text-brand-muted-dim">Цвет карточки</span>
          <select
            name="color"
            defaultValue={document?.color ?? DOCUMENT_COLOR_OPTIONS[0].value}
            className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
          >
            {DOCUMENT_COLOR_OPTIONS.map((color) => (
              <option key={color.value} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
        </label>
        <FileField
          label="Файл PDF (необязательно)"
          name="file"
          accept="application/pdf,image/*"
          currentUrl={document?.fileUrl}
          preview="link"
        />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-brand-ink px-5 py-3 text-xs font-semibold text-white disabled:opacity-60"
        >
          {isPending ? 'Сохраняем…' : document ? 'Сохранить' : 'Добавить документ'}
        </button>
        {document && (
          <button
            type="button"
            onClick={onDone}
            className="text-xs text-brand-muted-dim hover:underline"
          >
            Отмена
          </button>
        )}
      </div>
      {state.error && <p className="mt-3 text-xs text-red-600">{state.error}</p>}
    </form>
  )
}

const statusLabel: Record<LeadStatus, string> = {
  new: 'Новая',
  contacted: 'В работе',
  closed: 'Закрыта',
}

const statusClass: Record<LeadStatus, string> = {
  new: 'bg-brand-lime/20 text-brand-lime-ink',
  contacted: 'bg-amber-100 text-amber-800',
  closed: 'bg-brand-border text-brand-muted-dim',
}

function LeadsTab({ leads }: { leads: Lead[] }) {
  if (leads.length === 0) {
    return (
      <>
        <TabHeading eyebrow="Заявки" title="Входящие заявки" />
        <section className="overflow-hidden rounded-xl border border-dashed border-brand-border-strong bg-white p-12 text-center">
          <Inbox className="mx-auto mb-4 text-brand-muted-faint" size={28} />
          <h3 className="text-lg font-medium tracking-[-0.03em]">Заявок пока нет</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-brand-muted-faint">
            Как только кто-то отправит форму на сайте — заявка появится здесь.
          </p>
        </section>
      </>
    )
  }

  return (
    <>
      <TabHeading eyebrow="Заявки" title="Входящие заявки" />
      <section className="overflow-hidden rounded-xl border border-brand-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-brand-paper-alt text-[10px] uppercase tracking-[0.16em] text-brand-muted-faint">
              <tr>
                <th className="px-7 py-4 font-medium">Имя</th>
                <th className="px-7 py-4 font-medium">Телефон</th>
                <th className="px-7 py-4 font-medium">Комментарий</th>
                <th className="px-7 py-4 font-medium">Откуда</th>
                <th className="px-7 py-4 font-medium">Дата</th>
                <th className="px-7 py-4 font-medium">Статус</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <LeadRow key={lead.id} lead={lead} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

function LeadRow({ lead }: { lead: Lead }) {
  const [isPending, startTransition] = useTransition()

  return (
    <tr className="border-t border-brand-border">
      <td className="px-7 py-5 font-medium">{lead.name}</td>
      <td className="px-7 py-5 text-brand-muted-dim">
        <a href={`tel:${lead.phone.replace(/[^+\d]/g, '')}`} className="hover:text-brand-blue">
          {lead.phone}
        </a>
        {lead.email && <div className="text-xs text-brand-muted-faint">{lead.email}</div>}
      </td>
      <td className="max-w-xs px-7 py-5 text-xs text-brand-muted-faint">{lead.comment ?? '—'}</td>
      <td className="px-7 py-5 text-xs text-brand-muted-faint">{lead.source}</td>
      <td className="px-7 py-5 text-xs text-brand-muted-faint">
        {new Intl.DateTimeFormat('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }).format(lead.createdAt)}
      </td>
      <td className="px-7 py-5">
        <select
          value={lead.status}
          disabled={isPending}
          onChange={(event) =>
            startTransition(() => {
              void updateLeadStatus(lead.id, event.target.value as LeadStatus)
            })
          }
          className={`rounded-full border-0 px-3 py-1 text-[10px] font-medium outline-none ${statusClass[lead.status]}`}
        >
          {(Object.keys(statusLabel) as LeadStatus[]).map((status) => (
            <option key={status} value={status} className="text-brand-ink">
              {statusLabel[status]}
            </option>
          ))}
        </select>
      </td>
    </tr>
  )
}

function SettingsTab({ settings }: { settings: SiteSettings }) {
  const [state, formAction, isPending] = useActionState(updateSiteSettings, { ok: false })

  return (
    <>
      <TabHeading eyebrow="Настройки" title="Контакты сайта" />
      <form
        action={formAction}
        className="max-w-xl rounded-xl border border-brand-border bg-white p-7"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Телефон" name="phone" defaultValue={settings.phone} />
          <Field label="Email" name="email" type="email" defaultValue={settings.email} />
          <Field label="Город" name="city" defaultValue={settings.city} />
          <Field label="Адрес" name="address" defaultValue={settings.address} />
          <Field label="Юрлицо" name="legalName" defaultValue={settings.legalName} />
          <Field label="ИНН" name="inn" defaultValue={settings.inn} />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-6 rounded-full bg-brand-ink px-5 py-3 text-xs font-semibold text-white disabled:opacity-60"
        >
          {isPending ? 'Сохраняем…' : 'Сохранить'}
        </button>
        {state.ok && <p className="mt-3 text-xs text-brand-lime-ink">Сохранено.</p>}
        {state.error && <p className="mt-3 text-xs text-red-600">{state.error}</p>}
        <p className="mt-3 text-xs text-brand-muted-faint">
          Эти значения показываются в шапке, футере, на /contacts и на главной сайта.
        </p>
      </form>
    </>
  )
}

function ProfileTab({ currentAdmin }: { currentAdmin: CurrentAdmin }) {
  const [state, formAction, isPending] = useActionState(updateProfile, { ok: false })

  return (
    <>
      <TabHeading eyebrow="Профиль" title="Мой аккаунт" />
      <form
        action={formAction}
        className="max-w-xl rounded-xl border border-brand-border bg-white p-7"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Имя" name="firstName" defaultValue={currentAdmin.firstName ?? ''} />
          <Field label="Фамилия" name="lastName" defaultValue={currentAdmin.lastName ?? ''} />
          <Field label="Email" name="email" type="email" defaultValue={currentAdmin.email} />
          <Field label="Телефон" name="phone" defaultValue={currentAdmin.phone ?? ''} />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="mt-6 rounded-full bg-brand-ink px-5 py-3 text-xs font-semibold text-white disabled:opacity-60"
        >
          {isPending ? 'Сохраняем…' : 'Сохранить'}
        </button>
        {state.ok && <p className="mt-3 text-xs text-brand-lime-ink">Сохранено.</p>}
        {state.error && <p className="mt-3 text-xs text-red-600">{state.error}</p>}
        <p className="mt-3 text-xs text-brand-muted-faint">
          Email и телефон можно использовать для входа в админку.
        </p>
      </form>
      <div className="mt-6">
        <ChangePasswordForm />
      </div>
    </>
  )
}

const roleLabel: Record<AdminRole, string> = {
  owner: 'Владелец',
  manager: 'Менеджер',
}

function UsersTab({ admins, currentAdminId }: { admins: AdminSummary[]; currentAdminId: string }) {
  return (
    <>
      <TabHeading eyebrow="Пользователи" title="Доступ в админку" />
      <section className="mb-6 overflow-hidden rounded-xl border border-brand-border bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-brand-paper-alt text-[10px] uppercase tracking-[0.16em] text-brand-muted-faint">
              <tr>
                <th className="px-7 py-4 font-medium">Имя</th>
                <th className="px-7 py-4 font-medium">Email</th>
                <th className="px-7 py-4 font-medium">Телефон</th>
                <th className="px-7 py-4 font-medium">Роль</th>
                <th className="px-7 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <AdminRow key={admin.id} admin={admin} isSelf={admin.id === currentAdminId} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <CreateManagerForm />
    </>
  )
}

function AdminRow({ admin, isSelf }: { admin: AdminSummary; isSelf: boolean }) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const name = [admin.firstName, admin.lastName].filter(Boolean).join(' ') || '—'

  return (
    <tr className="border-t border-brand-border">
      <td className="px-7 py-5 font-medium">
        {name} {isSelf && <span className="text-xs text-brand-muted-faint">(вы)</span>}
      </td>
      <td className="px-7 py-5 text-brand-muted-dim">{admin.email}</td>
      <td className="px-7 py-5 text-brand-muted-dim">{admin.phone ?? '—'}</td>
      <td className="px-7 py-5">
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-medium ${
            admin.role === 'owner'
              ? 'bg-brand-blue/10 text-brand-blue'
              : 'bg-brand-lime/20 text-brand-lime-ink'
          }`}
        >
          {roleLabel[admin.role]}
        </span>
      </td>
      <td className="px-7 py-5 text-right">
        {admin.role !== 'owner' && !isSelf && (
          <button
            disabled={isPending}
            onClick={() => {
              if (!confirm(`Удалить доступ для ${admin.email}?`)) return
              startTransition(async () => {
                const result = await deleteManager(admin.id)
                if (!result.ok) setError(result.error ?? 'Не удалось удалить')
              })
            }}
            className="text-xs text-red-600 hover:underline disabled:opacity-50"
          >
            Удалить
          </button>
        )}
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </td>
    </tr>
  )
}

function CreateManagerForm() {
  const [state, formAction, isPending] = useActionState(createManager, { ok: false })
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset()
    }
  }, [state.ok])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="max-w-xl rounded-xl border border-brand-border bg-white p-7"
    >
      <h3 className="mb-1 font-medium">Добавить менеджера</h3>
      <p className="mb-5 text-xs text-brand-muted-faint">
        Полный доступ ко всем разделам, кроме управления пользователями.
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Имя" name="firstName" defaultValue="" />
        <Field label="Фамилия" name="lastName" defaultValue="" />
        <Field label="Email" name="email" type="email" defaultValue="" />
        <Field label="Телефон" name="phone" defaultValue="" />
      </div>
      <label className="mt-5 block text-sm">
        <span className="mb-2 block text-xs font-medium text-brand-muted-dim">
          Пароль (минимум 8 символов)
        </span>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
        />
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="mt-6 rounded-full bg-brand-ink px-5 py-3 text-xs font-semibold text-white disabled:opacity-60"
      >
        {isPending ? 'Создаём…' : 'Создать менеджера'}
      </button>
      {state.ok && <p className="mt-3 text-xs text-brand-lime-ink">Менеджер создан.</p>}
      {state.error && <p className="mt-3 text-xs text-red-600">{state.error}</p>}
    </form>
  )
}

function Field({
  label,
  name,
  defaultValue,
  type = 'text',
  placeholder,
}: {
  label: string
  name: string
  defaultValue: string
  type?: string
  placeholder?: string
}) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block text-xs font-medium text-brand-muted-dim">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-lg border border-brand-border bg-white px-4 py-3 text-sm text-brand-ink outline-none focus:border-brand-blue"
      />
    </label>
  )
}

function FileField({
  label,
  name,
  accept,
  currentUrl,
  preview,
}: {
  label: string
  name: string
  accept: string
  currentUrl?: string | null
  preview: 'image' | 'link'
}) {
  return (
    <label className="block text-sm">
      <span className="mb-2 block text-xs font-medium text-brand-muted-dim">{label}</span>
      {currentUrl &&
        (preview === 'image' ? (
          <img
            src={currentUrl}
            alt=""
            className="mb-2 h-16 w-16 rounded-lg border border-brand-border object-cover"
          />
        ) : (
          <a
            href={currentUrl}
            target="_blank"
            rel="noreferrer"
            className="mb-2 block text-xs text-brand-blue hover:underline"
          >
            Открыть текущий файл →
          </a>
        ))}
      <input
        type="file"
        name={name}
        accept={accept}
        className="w-full rounded-lg border border-brand-border bg-white px-3 py-2.5 text-xs text-brand-ink outline-none file:mr-3 file:rounded-full file:border-0 file:bg-brand-paper-alt file:px-3 file:py-1.5 file:text-xs file:font-medium focus:border-brand-blue"
      />
      {currentUrl && (
        <span className="mt-1 block text-[10px] text-brand-muted-faint">
          Оставьте пустым, чтобы не менять
        </span>
      )}
    </label>
  )
}

function Stat({
  title,
  value,
  change,
  icon,
}: {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-brand-border bg-white p-5">
      <div className="mb-8 flex items-center justify-between text-brand-muted">
        <span className="grid size-9 place-items-center rounded-full bg-brand-lime/15">{icon}</span>
        {change && <span className="text-[10px]">{change}</span>}
      </div>
      <p className="text-xs text-brand-muted-faint">{title}</p>
      <p className="mt-1 text-3xl font-medium tracking-[-0.07em]">{value}</p>
    </div>
  )
}
