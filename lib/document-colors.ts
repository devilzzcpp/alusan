// Пресеты фона карточки документа (Document.color, components/documents-browser.tsx).
// Тот же нюанс, что и с product-tones.ts: это Tailwind-класс (`bg-[#..]`), а
// Tailwind v4 генерирует CSS только для классов, которые видит в файлах при
// сборке — значение из БД напрямую он не подхватит. Поэтому select с пресетами.
export const DOCUMENT_COLOR_OPTIONS = [
  { label: 'Зелёный', value: 'bg-[#d8e7c0]' },
  { label: 'Серый', value: 'bg-[#dce1e5]' },
  { label: 'Бежевый', value: 'bg-[#e7dfd0]' },
  { label: 'Серо-зелёный', value: 'bg-[#d9e1dc]' },
  { label: 'Лавандовый', value: 'bg-[#dfe0e8]' },
  { label: 'Тёплый серый', value: 'bg-[#e3ded5]' },
  { label: 'Мятный', value: 'bg-[#d8e5e4]' },
  { label: 'Оливковый', value: 'bg-[#e3e5d1]' },
] as const
