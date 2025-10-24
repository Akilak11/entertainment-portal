# Развлекательный Портал-Агрегатор

Масштабируемый развлекательный портал с функциями социальной сети, форума, магазина, переводчика и мини-вики.

## 🎯 НАЧИНАЙТЕ ЗДЕСЬ: [START-HERE-WINDOWS.md](START-HERE-WINDOWS.md)

## 📋 Требования (Windows)

- **Node.js 20+** - https://nodejs.org/
- **Docker Desktop** - https://www.docker.com/products/docker-desktop/
- **Git** (опционально) - https://git-scm.com/download/win
- **Visual Studio Code** (рекомендуется) - https://code.visualstudio.com/

📖 **Подробная настройка:** [windows-setup.md](windows-setup.md)
🖥️ **Анализ хостингов:** [hosting-analysis.md](hosting-analysis.md)
🎯 **Финальная настройка:** [windows-final-setup.md](windows-final-setup.md)
✅ **MVP реализация:** [mvp-implementation.md](mvp-implementation.md)
🏆 **Финальный статус:** [final-status.md](final-status.md)
🚂 **Railway развертывание:** [RAILWAY-README.md](RAILWAY-README.md)
🔗 **GitHub настройка:** [GITHUB-README.md](GITHUB-README.md)
🚀 **Быстрое развертывание:** [deploy-railway.md](deploy-railway.md)
🧪 **Финальная проверка:** [final-check.bat](final-check.bat)

## 🚀 Быстрый старт (БЕСПЛАТНО!)

### ВАРИАНТ 1: Локальная разработка (0₽)
```cmd
REM 1. Используйте готовый скрипт
start-dev.bat

REM 2. Или вручную (PowerShell):
cd SocialShop
npm install
docker-compose up postgres redis -d
npm run dev
cd src/client
npm install
npm run dev
```

### ВАРИАНТ 2: Бесплатное развертывание
```cmd
REM 1. Проверьте готовность проекта
.\final-check.bat

REM 2. Разверните на Railway (рекомендуется)
.\deploy.bat

REM 3. Или выберите платформу:
REM Railway: https://railway.app/ (бесплатно)
REM Render: https://render.com/ (бесплатно)
REM Google Cloud: https://cloud.google.com/ (бесплатно, 300$ кредит)
```

### ВАРИАНТ 3: Быстрое развертывание Railway
```cmd
REM 1. Настройте GitHub
.\github-setup.bat

REM 2. В Railway Dashboard подключите репозиторий
REM 3. Готово! Railway развернет автоматически
```

## 🌐 Доступ к приложению

- **Главная страница:** http://localhost:3001
- **API сервер:** http://localhost:3000
- **Health check:** http://localhost:3000/health

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
