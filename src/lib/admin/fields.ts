import type { CrudField } from '@/app/components/admin/CollectionCrudView';

export const projectFields: CrudField[] = [
  { key: 'title', label: 'Назва', table: true },
  { key: 'titleEn', label: 'Назва (EN)' },
  { key: 'status', label: 'Статус', type: 'select', table: true, options: [
    { value: 'current', label: 'Поточний' },
    { value: 'done', label: 'Реалізований' },
  ]},
  { key: 'theme', label: 'Тема', type: 'select', table: true, options: [
    { value: 'debates', label: 'Дебати' },
    { value: 'ecology', label: 'Екологія' },
    { value: 'stem', label: 'STEM' },
  ]},
  { key: 'desc', label: 'Короткий опис', type: 'textarea' },
  { key: 'descEn', label: 'Короткий опис (EN)', type: 'textarea' },
  { key: 'period', label: 'Період' },
  { key: 'periodEn', label: 'Період (EN)' },
  { key: 'partners', label: 'Партнери' },
  { key: 'partnersEn', label: 'Партнери (EN)' },
  { key: 'themeLabel', label: 'Напрям (для сторінки проєкту)' },
  { key: 'themeLabelEn', label: 'Напрям (EN)' },
  { key: 'image', label: 'Зображення', type: 'image' },
  { key: 'results', label: 'Результати (кожен пункт з нового рядка)', type: 'lines' },
  { key: 'resultsEn', label: 'Результати EN (рядки)', type: 'lines' },
  { key: 'body', label: 'Повний текст', type: 'textarea' },
  { key: 'bodyEn', label: 'Повний текст (EN)', type: 'textarea' },
  { key: 'published', label: 'Публікація', type: 'checkbox', table: true },
];

export const eventFields: CrudField[] = [
  { key: 'date', label: 'Дата', type: 'date', table: true },
  { key: 'startTime', label: 'Час початку', placeholder: '10:00' },
  { key: 'title', label: 'Назва', table: true },
  { key: 'titleEn', label: 'Назва (EN)' },
  {
    key: 'place',
    label: 'Адреса в Луцьку (офлайн / гібрид)',
    table: true,
    fullWidth: true,
    placeholder: 'напр. Youth Center або вул. … — місто Луцьк додається автоматично',
  },
  { key: 'placeEn', label: 'Адреса (EN)', placeholder: 'Kyiv, …' },
  { key: 'direction', label: 'Напрям', type: 'select', options: [
    { value: 'Дебати', label: 'Дебати' },
    { value: 'Екологія', label: 'Екологія' },
    { value: 'Наука', label: 'Наука' },
  ]},
  { key: 'directionEn', label: 'Напрям (EN)', placeholder: 'Debates' },
  { key: 'format', label: 'Формат', type: 'select', table: true, options: [
    { value: 'offline', label: 'Офлайн' },
    { value: 'online', label: 'Онлайн' },
    { value: 'hybrid', label: 'Гібрид' },
  ]},
  { key: 'onlineUrl', label: 'Посилання (онлайн / трансляція)', placeholder: 'https://…' },
  { key: 'color', label: 'Колір (CSS)', placeholder: 'var(--yellow)' },
  { key: 'image', label: 'Зображення', type: 'image' },
  { key: 'excerpt', label: 'Короткий опис', type: 'textarea' },
  { key: 'excerptEn', label: 'Короткий опис (EN)', type: 'textarea' },
  { key: 'body', label: 'Повний опис', type: 'textarea' },
  { key: 'bodyEn', label: 'Повний опис (EN)', type: 'textarea' },
  { key: 'registrationEnabled', label: 'Реєстрація на сайті', type: 'checkbox', table: true },
  { key: 'capacity', label: 'Місць (0 = без ліміту)', placeholder: '30' },
  { key: 'registrationNote', label: 'Примітка для учасників', type: 'textarea', placeholder: 'Що взяти з собою, час збору…' },
  { key: 'registrationNoteEn', label: 'Примітка (EN)', type: 'textarea' },
  { key: 'published', label: 'Публікація', type: 'checkbox', table: true },
];

export const newsFields: CrudField[] = [
  { key: 'title', label: 'Назва', table: true },
  { key: 'titleEn', label: 'Назва (EN)' },
  { key: 'date', label: 'Дата', table: true },
  { key: 'tag', label: 'Тег', table: true },
  { key: 'tagEn', label: 'Тег (EN)' },
  { key: 'tagColor', label: 'Колір тегу', placeholder: 'var(--yellow)' },
  { key: 'excerpt', label: 'Короткий опис', type: 'textarea' },
  { key: 'excerptEn', label: 'Короткий опис (EN)', type: 'textarea' },
  { key: 'body', label: 'Повний текст', type: 'textarea' },
  { key: 'bodyEn', label: 'Повний текст (EN)', type: 'textarea' },
  { key: 'image', label: 'Зображення', type: 'image' },
  { key: 'published', label: 'Публікація', type: 'checkbox', table: true },
];

export const teamFields: CrudField[] = [
  { key: 'name', label: 'Імʼя', table: true },
  { key: 'role', label: 'Посада', table: true },
  { key: 'roleEn', label: 'Посада (EN)' },
  { key: 'text', label: 'Опис', type: 'textarea' },
  { key: 'textEn', label: 'Опис (EN)', type: 'textarea' },
  { key: 'photo', label: 'Фото', type: 'image', table: true },
  { key: 'linkedin', label: 'LinkedIn URL' },
  { key: 'tone', label: 'Колір картки', type: 'select', options: [
    { value: 'pink', label: 'Рожевий' },
    { value: 'blue', label: 'Синій' },
    { value: 'green', label: 'Зелений' },
    { value: 'yellow', label: 'Жовтий' },
  ]},
  { key: 'sortOrder', label: 'Порядок' },
  { key: 'published', label: 'Публікація', type: 'checkbox', table: true },
];

export const reviewFields: CrudField[] = [
  { key: 'author', label: 'Автор', table: true },
  { key: 'text', label: 'Текст', type: 'textarea', table: true },
  { key: 'tone', label: 'Колір', type: 'select', options: [
    { value: 'blue', label: 'Синій' },
    { value: 'pink', label: 'Рожевий' },
    { value: 'yellow', label: 'Жовтий' },
    { value: 'green', label: 'Зелений' },
  ]},
  { key: 'size', label: 'Розмір', type: 'select', options: [
    { value: 'wide', label: 'Широка' },
    { value: 'small', label: 'Мала' },
  ]},
  { key: 'published', label: 'Публікація', type: 'checkbox', table: true },
];

export const reportFields: CrudField[] = [
  { key: 'year', label: 'Рік', table: true },
  { key: 'title', label: 'Назва', table: true },
  { key: 'titleEn', label: 'Назва (EN)' },
  { key: 'file', label: 'Файл PDF', type: 'image' },
  { key: 'published', label: 'Публікація', type: 'checkbox', table: true },
];

export const galleryFields: CrudField[] = [
  { key: 'title', label: 'Подія / альбом', table: true },
  { key: 'titleEn', label: 'Назва (EN)' },
  { key: 'date', label: 'Дата', table: true },
  { key: 'cover', label: 'Обкладинка', type: 'image', table: true },
  { key: 'photoUrls', label: 'Фото в альбомі (URL, по одному в рядку)', type: 'lines' },
  { key: 'published', label: 'Публікація', type: 'checkbox', table: true },
];

export const tickerFields: CrudField[] = [
  { key: 'text', label: 'Текст', table: true },
];
