// Пресеты градиента для карточки товара (ProductCard, поле Product.tone).
// Это Tailwind-классы (`from-[#..] via-[#..] to-[#..]`) — Tailwind v4 генерирует
// CSS только для классов, которые видит в файлах проекта при сборке. Значение,
// вписанное в БД напрямую (минуя этот список), не даст градиента — поэтому в
// админке это select с пресетами, а не свободный текст.
export const TONE_OPTIONS = [
  { label: 'Серо-голубой', value: 'from-[#b9cdd3] via-[#f2f4f1] to-[#7e929b]' },
  { label: 'Бежевый', value: 'from-[#d5d0c4] via-[#f6f2e9] to-[#968d7e]' },
  { label: 'Серо-синий', value: 'from-[#aebcc7] via-[#e9edf0] to-[#748494]' },
  { label: 'Мятно-серый', value: 'from-[#c5d7dc] via-[#eef3f2] to-[#879ba4]' },
  { label: 'Тёплый серый', value: 'from-[#b7b5ae] via-[#e7e6df] to-[#85877f]' },
  { label: 'Зеленовато-серый', value: 'from-[#bac8c3] via-[#eff2eb] to-[#778c82]' },
  { label: 'Оливковый', value: 'from-[#c9cec2] via-[#f1f1ea] to-[#8d9284]' },
  { label: 'Голубой стальной', value: 'from-[#c2ccce] via-[#eef2f2] to-[#849398]' },
  { label: 'Песочный', value: 'from-[#cbc6bd] via-[#f2efe8] to-[#948d7d]' },
] as const
