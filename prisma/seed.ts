import { PrismaClient } from '@prisma/client'
import { categories, products } from './seed-data'
import { articles } from './seed-articles'
import { documents } from './seed-documents'
import { hashPassword } from '../lib/password'

const db = new PrismaClient()

async function main() {
  for (const [index, category] of categories.entries()) {
    await db.category.upsert({
      where: { slug: category.slug },
      update: { title: category.title, description: category.description, order: index },
      create: { ...category, order: index },
    })
  }

  for (const [index, product] of products.entries()) {
    const category = await db.category.findUniqueOrThrow({
      where: { slug: product.categorySlug },
    })
    const { categorySlug, ...productData } = product
    const existing = await db.product.findFirst({
      where: { name: productData.name, categoryId: category.id },
    })
    if (existing) {
      await db.product.update({
        where: { id: existing.id },
        data: { ...productData, categoryId: category.id, order: index },
      })
    } else {
      await db.product.create({
        data: { ...productData, categoryId: category.id, order: index },
      })
    }
  }

  const seedPublishDate = new Date('2026-09-01T09:00:00Z')

  for (const [index, article] of articles.entries()) {
    const publishedAt = new Date(seedPublishDate.getTime() - index * 24 * 60 * 60 * 1000)
    await db.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        body: article.body,
        status: 'published',
        publishedAt,
      },
      create: { ...article, status: 'published', publishedAt },
    })
  }

  for (const [index, document] of documents.entries()) {
    const existing = await db.document.findFirst({ where: { title: document.title } })
    if (existing) {
      await db.document.update({
        where: { id: existing.id },
        data: { ...document, order: index },
      })
    } else {
      await db.document.create({ data: { ...document, order: index } })
    }
  }

  await db.siteSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      phone: '+7 (903) 726-63-58',
      email: 'alusunn@yandex.ru',
      city: 'Гуково',
      address: '347880, Ростовская область, Пригородная ул., зд. 6, помещение 3, ком. 13',
      legalName: 'ООО «АЛЮСАН»',
      inn: '6144023539',
    },
  })

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@alusan.ru'
  const existingAdmin = await db.adminUser.findUnique({ where: { email: adminEmail } })
  if (!existingAdmin) {
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin12345'
    const passwordHash = await hashPassword(adminPassword)
    await db.adminUser.create({ data: { email: adminEmail, passwordHash, role: 'owner' } })
    console.log(
      `Создан админ-аккаунт: ${adminEmail} / ${adminPassword} — смените пароль в проде, повторный сид его не перезапишет.`,
    )
  }

  console.log(
    `Готово: ${categories.length} категорий, ${products.length} товаров, ${articles.length} статей, ${documents.length} документов, настройки сайта.`,
  )
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
