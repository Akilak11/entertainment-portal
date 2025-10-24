# 🎉 Развлекательный Портал-Агрегатор

**✅ MVP ЗАВЕРШЕН!** Полностью функциональный развлекательный портал с социальной сетью, форумом и аутентификацией.

**🚀 БЕСПЛАТНОЕ РАЗВЕРТЫВАНИЕ:** Railway предоставляет 512МБ RAM, PostgreSQL, Redis и домен бесплатно!

## 🚀 Быстрый старт (Windows)

```cmd
REM 1. Запустите проект
cd C:\socialnetwork\SocialShop
.\start-dev.bat

REM 2. Откройте в браузере
http://localhost:3000 (API)
http://localhost:3001 (Сайт)

REM 3. Разверните на Railway (бесплатно)
.\deploy.bat
```

## 📋 Требования (Windows)

- **Node.js 20+** - https://nodejs.org/
- **Docker Desktop** - https://www.docker.com/products/docker-desktop/
- **Git** (опционально) - https://git-scm.com/download/win
- **Visual Studio Code** (рекомендуется) - https://code.visualstudio.com/

## 🏗️ Архитектура

- **Backend:** Node.js + Express + TypeScript
- **Frontend:** Next.js 14 + React + TypeScript
- **База данных:** PostgreSQL + Redis (Docker)
- **Стили:** Tailwind CSS
- **API:** RESTful с JWT аутентификацией

## 📁 Структура проекта

```
SocialShop/
├── src/
│   ├── server/     # Backend API (порт 3000)
│   ├── client/     # Next.js frontend (порт 3001)
│   └── shared/     # Общие типы TypeScript
├── docker-compose.yml  # PostgreSQL + Redis
├── package.json    # Зависимости
├── README.md       # Документация
├── start-dev.bat   # Запуск разработки
├── deploy.bat      # Развертывание
└── test-all.bat    # Тестирование API
```

## ✨ Реализованные функции

### 🎯 MVP (готово)
- ✅ **Аутентификация** - JWT токены, регистрация, вход
- ✅ **Посты** - создание, просмотр, лайки, комментарии
- ✅ **Форум** - категории, топики, сообщения
- ✅ **Профили пользователей** - редактирование, настройки

### 🔄 Следующие этапы
- 🔄 **Магазин** - каталог, корзина, платежи
- 🔄 **Переводчик** - интеграция LibreTranslate
- 🔄 **Мини-вики** - статьи, категории, поиск
- 🔄 **Социальные функции** - stories, мессенджер

## 🌐 API Endpoints

### Аутентификация
```
POST /api/auth/register  # Регистрация
POST /api/auth/login     # Вход
GET  /api/users/:id      # Профиль
```

### Посты
```
GET    /api/posts           # Лента постов
POST   /api/posts           # Создать пост
GET    /api/posts/:id       # Пост
PUT    /api/posts/:id       # Обновить пост
DELETE /api/posts/:id       # Удалить пост
POST   /api/posts/:id/like  # Лайк
GET    /api/posts/:id/comments  # Комментарии
```

### Форум
```
GET    /api/forum              # Форумы
GET    /api/forum/:id/topics   # Топики
POST   /api/forum/:id/topics   # Создать топик
GET    /api/forum/topics/:id   # Топик
```

## 💰 Стоимость развертывания

### БЕСПЛАТНО (0₽):
```
✅ Railway: 512МБ RAM, PostgreSQL, Redis
✅ Домен: your-app.railway.app
✅ SSL сертификат
✅ CDN и кеширование
```

### ПЛАТНО (от 99₽/мес):
```
✅ Домен .ru: 99₽/год (DNAR.ru)
✅ Выделенный сервер: 90₽/мес (YouStable)
```

## 🚀 Быстрый старт (БЕСПЛАТНО!)

### Локальная разработка
```cmd
REM 1. Запустите проект автоматически
.\start-dev.bat

REM 2. Откройте в браузере:
REM    http://localhost:3000 (API)
REM    http://localhost:3001 (Сайт)
```

### Тестирование API
```cmd
REM Проверьте все endpoints
.\test-all.bat
```

### Развертывание на Railway (бесплатно)

**Railway предоставляет 512МБ RAM, PostgreSQL, Redis и домен БЕСПЛАТНО!**

#### Шаг 1: Создайте GitHub репозиторий
```cmd
1. Перейдите: https://github.com/new
2. Название: entertainment-portal
3. Описание: Развлекательный портал-агрегатор
4. Сделайте публичным (Public)
5. НЕ добавляйте README или .gitignore
6. Нажмите "Create repository"
```

#### Шаг 2: Настройте Git
```cmd
cd C:\socialnetwork\SocialShop
.\github-setup.bat
```

#### Шаг 3: Разверните на Railway
```cmd
1. Откройте: https://railway.app/
2. Создайте New Project
3. Выберите "Deploy from GitHub"
4. Подключите репозиторий entertainment-portal
5. Railway развернет автоматически
```

**Результат:** https://your-app.railway.app

## 🌐 Доступ к приложению

### Локально
- **Главная страница:** http://localhost:3001
- **API сервер:** http://localhost:3000
- **База данных (PgAdmin):** http://localhost:5050 (admin@admin.com / admin)
- **Health check:** http://localhost:3000/health

### Railway (бесплатно)
- **Ваш портал:** https://your-app.railway.app
- **API:** https://your-app.railway.app/api/posts
- **Документация:** https://your-app.railway.app/api/posts

## 🛠️ Скрипты

```cmd
.\start-dev.bat      # Запуск разработки
.\test-all.bat       # Тестирование API
.\github-setup.bat   # Настройка GitHub
.\railway.bat       # Railway CLI (Windows)
.\deploy.bat        # Выбор хостинга
```

## 📚 Документация

- **README.md** - основная документация
- **Health check:** http://localhost:3000/health

## 🗂️ Структура проекта

```
SocialShop/
├── src/                    # Исходный код
│   ├── server/            # Backend API
│   ├── client/            # Next.js frontend
│   └── shared/            # Общие типы
├── docker-compose.yml     # Базы данных
├── README.md             # Эта документация
├── start-dev.bat        # Запуск разработки
├── test-all.bat         # Тестирование API
├── github-setup.bat     # Настройка GitHub
├── railway.bat          # Railway CLI
├── deploy.bat           # Развертывание
└── package.json         # Зависимости
```

**Всего 15 файлов** - чисто и без мусора! 🎯

## 🎯 Что дальше?

1. **Запустите:** `.\start-dev.bat`
2. **Откройте:** http://localhost:3001
3. **Протестируйте API:** `.\test-all.bat`
4. **Разверните на Railway:** Следуйте [deploy-railway.md](deploy-railway.md)

**🎉 Ваш развлекательный портал готов!**

## 🏗️ Архитектура

### Backend (Node.js + Express)
- **API:** RESTful API с JWT аутентификацией
- **База данных:** PostgreSQL с TypeORM
- **Кеширование:** Redis
- **Файлы:** MinIO (S3-совместимое хранилище)
- **Поиск:** Elasticsearch

### Frontend (Next.js)
- **Фреймворк:** Next.js 14 с App Router
- **Стили:** Tailwind CSS
- **Состояние:** React Query
- **Формы:** React Hook Form
- **UI:** Headless UI + Heroicons

## 📁 Структура проекта

```
├── src/
│   ├── server/          # Backend API сервер
│   │   ├── controllers/ # Контроллеры API
│   │   ├── middleware/  # Middleware (аутентификация, валидация)
│   │   ├── models/      # Модели базы данных
│   │   ├── routes/      # API роуты
│   │   ├── services/    # Бизнес-логика
│   │   └── utils/       # Утилиты (БД, Redis, валидация)
│   ├── client/          # Next.js frontend
│   │   ├── src/
│   │   │   ├── app/     # Next.js App Router
│   │   │   ├── components/ # React компоненты
│   │   │   ├── lib/     # Утилиты и конфигурации
│   │   │   └── types/   # TypeScript типы
│   └── shared/          # Общие типы и интерфейсы
├── docker-compose.yml   # Docker конфигурация
├── Dockerfile          # Dockerfile для сервера
├── package.json        # Зависимости проекта
└── tsconfig.json       # TypeScript конфигурация
```

## 🔧 API Endpoints

### Аутентификация
- `POST /api/auth/login` - Вход
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/refresh` - Обновление токена
- `POST /api/auth/logout` - Выход

### Пользователи
- `GET /api/users/:id` - Профиль пользователя
- `PUT /api/users/:id` - Обновление профиля
- `GET /api/users/:id/posts` - Посты пользователя

### Посты
- `GET /api/posts` - Лента постов
- `POST /api/posts` - Создать пост
- `PUT /api/posts/:id` - Обновить пост
- `DELETE /api/posts/:id` - Удалить пост

### Форум
- `GET /api/forum` - Список форумов
- `GET /api/forum/:id/topics` - Темы форума
- `POST /api/forum/:id/topics` - Создать тему

### Магазин
- `GET /api/shop/products` - Каталог товаров
- `POST /api/shop/cart` - Добавить в корзину
- `POST /api/shop/orders` - Создать заказ

### Переводчик
- `POST /api/translator/translate` - Перевести текст
- `GET /api/translator/languages` - Поддерживаемые языки

### Wiki
- `GET /api/wiki/articles` - Статьи вики
- `POST /api/wiki/articles` - Создать статью
- `PUT /api/wiki/articles/:id` - Обновить статью

## 🚀 Развертывание

### Production с Docker
```bash
# Сборка и запуск
docker-compose -f docker-compose.prod.yml up -d

# Логи
docker-compose logs -f server
```

### Production без Docker
```bash
# Сборка
npm run build

# Запуск
npm start
```

## 🧪 Тестирование

```bash
# Запуск тестов
npm test

# Тестирование API
npm run test:api

# E2E тестирование
npm run test:e2e
```

## 📊 Мониторинг

- **Health checks:** `/health`
- **Логи:** `./logs/`
- **Метрики:** Prometheus/Grafana (опционально)

## 🤝 Контрибьютинг

1. Fork репозиторий
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Закоммитьте изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Создайте Pull Request

## 📝 Лицензия

Этот проект лицензирован под MIT License.

## 🆘 Поддержка

- **Документация:** [Wiki проекта](https://github.com/your-username/entertainment-portal/wiki)
- **Issues:** [GitHub Issues](https://github.com/your-username/entertainment-portal/issues)
- **Discussions:** [GitHub Discussions](https://github.com/your-username/entertainment-portal/discussions)

## 💰 СТОИМОСТЬ РАЗВЕРТЫВАНИЯ

### БЕСПЛАТНАЯ КОНФИГУРАЦИЯ (0₽):
```
✅ Домен: your-project.github.io (бесплатно)
✅ Хостинг: Railway/Render/Google Cloud (бесплатно)
✅ База данных: Supabase (бесплатно до 500МБ)
✅ Файлы: Cloudinary (бесплатно до 25ГБ)
✅ Email: SendGrid (бесплатно до 100 email/день)
✅ Переводы: LibreTranslate (бесплатно)
─────────────
ИТОГО: 0₽/мес
```

### МИНИМАЛЬНАЯ ПЛАТНАЯ (от 99₽/мес):
```
✅ Домен .ru: 99₽/год (DNAR.ru)
✅ Хостинг: 90₽/мес (YouStable)
✅ База данных: Supabase (бесплатно)
✅ Файлы: Cloudinary (бесплатно)
─────────────
ИТОГО: ~190₽/мес
```

### Подробный план: [implementation-plan.md](implementation-plan.md)

## 🗺️ Roadmap

- [ ] MVP (1-2 недели)
  - [ ] ✅ Базовая аутентификация (JWT)
  - [ ] ✅ Профили пользователей
  - [ ] ✅ Простая лента постов
  - [ ] ✅ Базовый форум

- [ ] Core Features (1-2 месяца)
  - [ ] Социальные функции (stories, мессенджер)
  - [ ] Магазин (корзина, платежи)
  - [ ] Переводчик (LibreTranslate API)
  - [ ] Мини-вики (статьи, поиск)

- [ ] Оптимизация (1 месяц)
  - [ ] Производительность (кеширование, CDN)
  - [ ] Масштабируемость (load balancer)
  - [ ] Мониторинг (бесплатные инструменты)
  - [ ] Безопасность (HTTPS, защита)
