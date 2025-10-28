# 🚀 ПОДРОБНЫЙ ПРОМПТ ДЛЯ АГЕНТА ИИ - РАЗВЛЕКАТЕЛЬНЫЙ ПОРТАЛ

## 📋 КОНТЕКСТ ПРОЕКТА
**Название:** Entertainment Portal (Развлекательный Портал)  
**Тип:** Full-Stack веб-приложение  
**Хостинг:** Render (бесплатный план)  
**Технологии:** Next.js 14 + Node.js + PostgreSQL + Redis

---

## 🏗️ АРХИТЕКТУРА ПРОЕКТА

### **Frontend (Next.js 14 + TypeScript)**
```
src/client/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Главный layout с AuthProvider
│   ├── page.tsx          # Главная страница
│   ├── globals.css       # Глобальные стили
│   ├── login/            # Страница входа
│   ├── register/         # Страница регистрации
│   ├── profile/          # Страница профиля
│   ├── social/           # Социальная сеть
│   ├── forum/            # Форум
│   ├── shop/             # Магазин
│   ├── translator/       # Переводчик
│   └── wiki/             # Вики
├── components/           # React компоненты
│   ├── Navigation.tsx    # Динамическая навигация с dropdown
│   └── ProtectedRoute.tsx # Защита маршрутов с перенаправлениями
├── contexts/             # React Context API
│   └── AuthContext.tsx   # Полное управление аутентификацией с отладкой
├── hooks/                # Пользовательские хуки
├── lib/                  # Утилиты
└── types/                # TypeScript типы
```

### **Backend (Node.js + Express + TypeScript)**
```
src/server/
├── index.ts              # Главный сервер Express
├── middleware/           # Middleware
│   ├── authMiddleware.ts # JWT аутентификация (authenticateToken)
│   ├── errorHandler.ts   # Обработка ошибок
│   ├── notFound.ts       # 404 обработчик
│   └── validation.ts     # Joi валидация (login/register)
├── routes/               # API маршруты
│   ├── auth.ts           # /api/auth/*
│   ├── users.ts          # /api/users/*
│   ├── posts.ts          # /api/posts/*
│   ├── forum.ts          # /api/forum/*
│   ├── shop.ts           # /api/shop/*
│   ├── translator.ts     # /api/translator/*
│   └── wiki.ts           # /api/wiki/*
├── controllers/          # Контроллеры API
│   └── authController.ts # Логика аутентификации
├── services/             # Бизнес-логика
│   └── authService.ts    # Сервисы аутентификации
├── models/               # Модели данных
│   └── User.ts           # Модель пользователя
├── utils/                # Утилиты
│   ├── database.ts       # Подключение к PostgreSQL
│   ├── redis.ts          # Подключение к Redis
│   └── initDatabase.ts   # Инициализация БД
└── types/                # Server-side типы
```

---

## 🗄️ БАЗА ДАННЫХ (PostgreSQL)

### **Таблицы:**
```sql
-- Пользователи
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  avatar_url VARCHAR(500),
  bio TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Посты социальной сети
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_urls JSONB DEFAULT '[]',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  reposts_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Комментарии
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Профиль пользователя
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  birth_date DATE,
  location VARCHAR(255),
  website VARCHAR(255),
  privacy_settings JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Форумы и темы
CREATE TABLE forums (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, parent_id INTEGER REFERENCES forums(id) ON DELETE CASCADE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE forum_topics (id SERIAL PRIMARY KEY, forum_id INTEGER REFERENCES forums(id) ON DELETE CASCADE, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, views_count INTEGER DEFAULT 0, messages_count INTEGER DEFAULT 0, is_pinned BOOLEAN DEFAULT FALSE, is_locked BOOLEAN DEFAULT FALSE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE forum_messages (id SERIAL PRIMARY KEY, topic_id INTEGER REFERENCES forum_topics(id) ON DELETE CASCADE, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, content TEXT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

-- Магазин
CREATE TABLE product_categories (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, parent_id INTEGER REFERENCES product_categories(id) ON DELETE CASCADE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, price DECIMAL(10,2) NOT NULL, category_id INTEGER REFERENCES product_categories(id) ON DELETE CASCADE, images JSONB DEFAULT '[]', stock INTEGER DEFAULT 0, is_active BOOLEAN DEFAULT TRUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, status VARCHAR(50) DEFAULT 'pending', total DECIMAL(10,2) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE order_items (id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE, product_id INTEGER REFERENCES products(id) ON DELETE CASCADE, quantity INTEGER NOT NULL, price DECIMAL(10,2) NOT NULL);

-- Вики
CREATE TABLE wiki_categories (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, description TEXT, parent_id INTEGER REFERENCES wiki_categories(id) ON DELETE CASCADE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE wiki_articles (id SERIAL PRIMARY KEY, title VARCHAR(255) NOT NULL, content TEXT NOT NULL, category_id INTEGER REFERENCES wiki_categories(id) ON DELETE CASCADE, user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, views_count INTEGER DEFAULT 0, is_published BOOLEAN DEFAULT FALSE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
```

---

## 🔐 СИСТЕМА АУТЕНТИФИКАЦИИ

### **AuthContext (React Context)**
```typescript
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>; // Автоматически входит после регистрации
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
```

**Особенности:**
- ✅ **Автоматический вход** после успешной регистрации
- ✅ **Проверка токенов** при загрузке приложения с отладкой
- ✅ **Обновление токенов** при истечении срока
- ✅ **Синхронизация состояния** между компонентами
- ✅ **Сохранение состояния** после перезагрузки страницы
- ✅ **Защищенные маршруты** с перенаправлениями

### **JWT Токены**
- **Access Token:** Короткоживущий (используется для API запросов)
- **Refresh Token:** Долгоживущий (для обновления access token)
- **Хранение:** localStorage (или можно перейти на httpOnly cookies)

### **API Маршруты**
```
POST /api/auth/register     # Регистрация (с хэшированием пароля)
POST /api/auth/login        # Вход (с проверкой bcrypt)
POST /api/auth/refresh      # Обновление токена
POST /api/auth/logout       # Выход
GET  /api/auth/me          # Текущий пользователь (с JWT middleware)

PUT  /api/users/profile     # Обновление профиля (имя, фамилия, био, username)
GET  /api/users/:id         # Получение пользователя по ID
PUT  /api/users/:id         # Обновление пользователя по ID
```

---

## 🎨 UI/UX ДИЗАЙН

### **Bootstrap 5 + Кастомные стили**
- **Цветовая схема:** Градиенты (синий → фиолетовый)
- **Компоненты:** Cards, Forms, Navigation, Alerts
- **Иконки:** Font Awesome 6
- **Адаптивность:** Mobile-first подход

### **Навигация (динамическая)**
- **Гостевой режим:** Регистрация, Вход
- **Авторизованный:** Dropdown меню с профилем (Мой профиль, Настройки, Выход)
- **Всегда:** Соцсеть, Форум, Магазин, Переводчик, Вики
- **Адаптивность:** Bootstrap responsive navbar

### **Формы валидации**
- **Визуальные индикаторы:** is-valid (зеленый), is-invalid (красный)
- **Сообщения об ошибках:** Под полями формы
- **Статус-бар:** Текущее состояние заполнения
- **Tooltip подсказки:** При наведении на кнопку

---

## 📦 ЗАВИСИМОСТИ (package.json)

### **Frontend (src/client/package.json)**
```json
{
  "name": "entertainment-portal-client",
  "version": "1.0.0",
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "bootstrap": "^5.3.0",
    "lucide-react": "^0.263.0",
    "framer-motion": "^10.12.0",
    "axios": "^1.6.0"
  }
}
```

### **Backend (package.json)**
```json
{
  "name": "entertainment-portal",
  "dependencies": {
    "express": "^4.18.2",
    "pg": "^8.11.3",
    "redis": "^4.6.12",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "joi": "^17.12.0",
    "helmet": "^7.1.0",
    "cors": "^2.8.5",
    "express-rate-limit": "^7.1.5"
  }
}
```

---

## 🚀 РАЗВЕРТЫВАНИЕ (Render)

### **Конфигурация:**
```
Build Command: npm install && npm run build
Start Command: npm start
Runtime: Node.js
Region: Frankfurt (EU Central)
```

### **Переменные окружения:**
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
LIBRETRANSLATE_API_URL=https://libretranslate.de/translate
```

### **Базы данных:**
- **PostgreSQL:** Free план (256MB RAM, 1GB storage)
- **Redis:** Free план (25MB RAM, 50 connections)

---

## 🎯 ТЕКУЩЕЕ СОСТОЯНИЕ ПРОЕКТА

### **✅ РЕАЛИЗОВАНО:**
- [x] **Базовая структура** проекта (Frontend + Backend)
- [x] **Базы данных** PostgreSQL + Redis с полной миграцией (11 таблиц)
- [x] **Полная аутентификация** (регистрация, вход, JWT токены, middleware, bcrypt)
- [x] **AuthContext** с управлением состоянием, отладкой и автоматическим входом
- [x] **ProtectedRoute** компонент для защиты страниц с перенаправлениями
- [x] **Страница профиля** с редактированием (имя, фамилия, био, username) и защитой
- [x] **Динамическая навигация** (гость/авторизованный с dropdown меню профиля)
- [x] **API endpoints** для пользователей и аутентификации (/api/auth/me, /api/users/profile)
- [x] **Валидация форм** с визуальными индикаторами и статус-баром
- [x] **Bootstrap UI** с кастомными стилями, градиентами и анимациями
- [x] **Развертывание** на Render с CI/CD, CSP отключением и всеми исправлениями
- [x] **TypeScript** полная типизация без ошибок компиляции (все конфликты имен исправлены)

### **🔄 В ПРОЦЕССЕ:**
- [ ] **Социальная сеть** (посты, лайки, комментарии)
- [ ] **Форум** (категории, темы, сообщения)
- [ ] **Магазин** (товары, корзина, заказы)
- [ ] **Переводчик** (интеграция с LibreTranslate)
- [ ] **Вики** (статьи, категории, поиск)

### **📋 MVP ЦЕЛИ:**
1. **Завершить социальную сеть** (CRUD постов, лайки, комментарии)
2. **Реализовать базовый форум** (темы, сообщения)
3. **Добавить товары в магазин** (каталог, корзина)
4. **Интегрировать переводчик** (API + интерфейс)
5. **Создать мини-вики** (статьи, редактирование)

---

## 🛠️ ИНСТРУКЦИИ ДЛЯ РАЗРАБОТКИ

### **Запуск локально:**
```bash
# Установить зависимости
npm install

# Запустить базы данных (Docker)
docker-compose up -d

# Запустить проект (сервер + клиент одновременно)
npm run dev
```

### **Особенности запуска:**
- ✅ **Автоматическая инициализация** баз данных при первом запуске сервера
- ✅ **CSP отключен** для работы Bootstrap (можно включить для продакшена)
- ✅ **Все TypeScript ошибки** исправлены, компиляция проходит без проблем
- ✅ **Отладка включена** в AuthContext для разработки

### **Структура задач:**
1. **Начать с социальной сети** - самая важная фича
2. **Использовать существующие модели** и расширять их
3. **Следовать паттернам** уже реализованного кода
4. **Тестировать на Render** после каждого коммита

### **Ключевые файлы для изучения:**
- `src/shared/types/index.ts` - все типы данных
- `src/server/models/User.ts` - паттерн моделей
- `src/server/routes/auth.ts` - паттерн API маршрутов
- `src/client/src/contexts/AuthContext.tsx` - управление состоянием
- `src/client/src/components/Navigation.tsx` - компоненты

---

## 🎯 СТРАТЕГИЯ РАЗВИТИЯ

### **Приоритет 1: Социальная сеть**
- Создать модель Post
- Реализовать API для постов
- Добавить страницу с лентой
- Интегрировать с профилем пользователя

### **Приоритет 2: Форум**
- Создать модели Forum/Topic/Message
- Реализовать древовидную структуру
- Добавить интерфейс форума

### **Приоритет 3: Магазин**
- Создать модели Product/Order
- Реализовать каталог товаров
- Добавить корзину и оформление заказа

### **Приоритет 4: Сервисы**
- Переводчик (LibreTranslate API)
- Вики (CRUD статей)

---

## 📚 ДОКУМЕНТАЦИЯ

### **Основные файлы:**
- `README.md` - основная документация
- `render-setup-instructions.md` - инструкции по развертыванию
- `src/server/utils/initDatabase.ts` - схема БД

### **API документация:**
- Все маршруты в `src/server/routes/`
- Типы запросов/ответов в `src/shared/types/`

---

## 🚀 ГОТОВ К РАЗРАБОТКЕ!

**Проект имеет solid foundation:** полная аутентификация, базы данных, UI фреймворк, развертывание. Осталось реализовать основные фичи (соцсеть, форум, магазин) используя существующие паттерны и инфраструктуру.
