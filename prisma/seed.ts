import { PrismaClient } from '@prisma/client'
import { categories, products } from './seed-data'
import { articles } from './seed-articles'

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

  console.log(
    `Готово: ${categories.length} категорий, ${products.length} товаров, ${articles.length} статей.`,
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
