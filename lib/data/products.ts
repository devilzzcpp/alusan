export type Category = {
  slug: string
  title: string
  description: string
}

export type Product = {
  code: string
  name: string
  category: string
  description: string
  spec: string
  material: string
  tone: string
}

export const categories: Category[] = [
  {
    slug: 'lestnicy',
    title: 'Лестницы',
    description: 'Приставные и раздвижные модели для дома, ремонта и профессиональных задач.',
  },
  {
    slug: 'stremyanki',
    title: 'Стремянки',
    description: 'Устойчивые стремянки для ежедневной работы на небольшой и средней высоте.',
  },
  {
    slug: 'sharnirnye-lestnicy',
    title: 'Шарнирные лестницы',
    description: 'Трансформируемые конструкции с несколькими рабочими положениями.',
  },
  {
    slug: 'vyshki-tury',
    title: 'Вышки-туры',
    description: 'Мобильные рабочие платформы для монтажа, отделки и обслуживания.',
  },
  {
    slug: 'podmosti',
    title: 'Подмости',
    description: 'Компактные рабочие места с устойчивой платформой и быстрым монтажом.',
  },
  {
    slug: 'accessories',
    title: 'Аксессуары',
    description: 'Комплектующие, опоры и дополнительные элементы для лестничных систем.',
  },
]

export const products: Product[] = [
  {
    code: 'Бытовая серия',
    name: 'Стремянка компактная',
    category: 'Стремянки',
    description: 'Компактная бытовая модель для дома и мастерской',
    spec: 'Четыре ступени · высота один метр двадцать сантиметров',
    material: 'Алюминий 6063 · 1.5 мм',
    tone: 'from-[#b9cdd3] via-[#f2f4f1] to-[#7e929b]',
  },
  {
    code: 'Бытовая серия',
    name: 'Стремянка высокая',
    category: 'Стремянки',
    description: 'Устойчивая высота для ежедневных задач',
    spec: 'Семь ступеней · высота один метр девяносто сантиметров',
    material: 'Алюминий 6063 · 1.5 мм',
    tone: 'from-[#d5d0c4] via-[#f6f2e9] to-[#968d7e]',
  },
  {
    code: 'Приставная серия',
    name: 'Лестница приставная',
    category: 'Лестницы',
    description: 'Приставная лестница для дома и бизнеса',
    spec: 'Восемь ступеней · высота два метра сорок сантиметров',
    material: 'Алюминий 6063 · 2.0 мм',
    tone: 'from-[#aebcc7] via-[#e9edf0] to-[#748494]',
  },
  {
    code: 'Шарнирная серия',
    name: 'Лестница трансформер',
    category: 'Шарнирные лестницы',
    description: 'Четыре рабочих положения в одной системе',
    spec: 'Три секции · высота до пяти метров',
    material: 'Алюминий 6063 · 2.0 мм',
    tone: 'from-[#c5d7dc] via-[#eef3f2] to-[#879ba4]',
  },
  {
    code: 'Профессиональная серия',
    name: 'Вышка мобильная',
    category: 'Вышки-туры',
    description: 'Мобильная рабочая платформа с колёсами',
    spec: 'Высота четыре метра · рабочая платформа',
    material: 'Алюминий 6063 · 2.5 мм',
    tone: 'from-[#b7b5ae] via-[#e7e6df] to-[#85877f]',
  },
  {
    code: 'Рабочая серия',
    name: 'Подмости рабочие',
    category: 'Подмости',
    description: 'Рабочее место для отделочных и монтажных работ',
    spec: 'Высота один метр восемьдесят сантиметров · высокая нагрузка',
    material: 'Алюминий 6063 · 2.5 мм',
    tone: 'from-[#bac8c3] via-[#eff2eb] to-[#778c82]',
  },
  {
    code: 'Комплектующие',
    name: 'Опоры',
    category: 'Аксессуары',
    description: 'Устойчивые опоры для работы на мягком и неровном грунте',
    spec: 'Комплект четыре штуки',
    material: 'Алюминий 6063',
    tone: 'from-[#c9cec2] via-[#f1f1ea] to-[#8d9284]',
  },
  {
    code: 'Комплектующие',
    name: 'Поручни',
    category: 'Аксессуары',
    description: 'Дополнительные поручни для безопасной работы на высоте',
    spec: 'Комплект на одну секцию',
    material: 'Алюминий 6063',
    tone: 'from-[#c2ccce] via-[#eef2f2] to-[#849398]',
  },
  {
    code: 'Комплектующие',
    name: 'Колёса',
    category: 'Аксессуары',
    description: 'Поворотные колёса с тормозом для мобильных платформ',
    spec: 'Комплект четыре штуки',
    material: 'Сталь · полиуретан',
    tone: 'from-[#cbc6bd] via-[#f2efe8] to-[#948d7d]',
  },
]

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug)
}

export function getProductsByCategoryTitle(title: string) {
  return products.filter((product) => product.category === title)
}
