import { redirect } from 'next/navigation'
import { AdminShell } from '@/components/admin/admin-shell'
import { getAllLeads } from '@/lib/leads'
import { getSiteSettings } from '@/lib/settings'
import { getAllProductsForAdmin, getCategories } from '@/lib/products'
import { getAllArticlesForAdmin } from '@/lib/articles'
import { getAllDocuments } from '@/lib/documents'
import { getCurrentAdmin } from '@/lib/current-admin'
import { getAllAdmins } from '@/lib/admins'

export default async function AdminPage() {
  const currentAdmin = await getCurrentAdmin()
  if (!currentAdmin) {
    redirect('/admin/login')
  }

  const [leads, settings, products, categories, articles, documents, admins] = await Promise.all([
    getAllLeads(),
    getSiteSettings(),
    getAllProductsForAdmin(),
    getCategories(),
    getAllArticlesForAdmin(),
    getAllDocuments(),
    currentAdmin.role === 'owner' ? getAllAdmins() : Promise.resolve([]),
  ])

  return (
    <AdminShell
      currentAdmin={currentAdmin}
      leads={leads}
      settings={settings}
      products={products}
      categories={categories}
      articles={articles}
      documents={documents}
      admins={admins}
    />
  )
}
