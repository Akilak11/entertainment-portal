# 🚀 Настройка Render - ПОДРОБНАЯ ИНСТРУКЦИЯ

## ✅ **Что выбрать в форме Render (на основе ваших скриншотов):**

### 1. **Source Code**
- ✅ **Git Provider:** Public Git Repository
- ✅ **Repository:** `https://github.com/Akilak11/entertainment-portal`

### 2. **Settings**
- **Name:** `entertainment-portal` (или любое имя)
- ❌ **Language:** НЕ Docker! Выберите **Node**
- **Branch:** `main`
- **Region:** `Frankfurt (EU Central)` ✅ (хорошо для Европы)
- **Root Directory:** Оставьте **пустым** (корень репозитория)

### 3. **Build Settings**
- ❌ **Build Command:** НЕ `$ npm install`!
- ✅ **Build Command:** `npm install && npm run build`
- ❌ **Start Command:** НЕ `$ node dist/server/index.js`!
- ✅ **Start Command:** `npm start`

### 4. **Environment Variables**
Добавьте эти переменные:
```env
NODE_ENV=production
JWT_SECRET=your-super-secret-key-here-generate-random
JWT_REFRESH_SECRET=your-refresh-secret-key-here-different
LIBRETRANSLATE_API_URL=https://libretranslate.de/translate
```

### 5. **Instance Type**
- ✅ **Free** (512MB RAM, 0.1 CPU) - достаточно для старта

---

## 📋 **ПОШАГОВАЯ НАСТРОЙКА:**

### ШАГ 1: Основные настройки
```cmd
Name: entertainment-portal
Language: Node (НЕ Docker!)
Branch: main
Region: Frankfurt (EU Central)
Root Directory: (пустое)
```

### ШАГ 2: Build команды
```cmd
Build Command: npm install && npm run build
Start Command: npm start
```

### ШАГ 3: Environment Variables
```env
NODE_ENV=production
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
LIBRETRANSLATE_API_URL=https://libretranslate.de/translate
```

### ШАГ 4: Создайте базы данных
1. В Dashboard нажмите **"New+"** → **"PostgreSQL"**
2. Выберите **Free** план
3. Назовите `entertainment-portal-db`
4. Скопируйте `DATABASE_URL`

5. Аналогично создайте **Redis**:
   - **"New+"** → **"Key Value"**
   - **Free** план
   - Назовите `entertainment-portal-redis`
   - Скопируйте `REDIS_URL`

### ШАГ 5: Подключите базы данных
В Environment Variables добавьте:
```env
DATABASE_URL=${{ entertainment-portal-db.DATABASE_URL }}
REDIS_URL=${{ entertainment-portal-redis.REDIS_URL }}
```

---

## 🌐 **Результат:**

После настройки Render предоставит:
- **URL портала:** https://entertainment-portal.onrender.com
- **API:** https://entertainment-portal.onrender.com/api/posts
- **Бесплатно:** 512МБ RAM, PostgreSQL, Redis

---

## 🔧 **Что исправить в ваших скриншотах:**

### ❌ **НЕПРАВИЛЬНО:**
- **Language:** Docker (должен быть Node)
- **Build Command:** `$ npm install` (должен быть `npm install && npm run build`)
- **Start Command:** `$ node dist/server/index.js` (должен быть `npm start`)

### ✅ **ПРАВИЛЬНО:**
- **Language:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- **Root Directory:** пустое

---

## 💡 **Почему эти настройки важны:**

1. **Node** - правильный runtime для Node.js приложения
2. **npm install && npm run build** - устанавливает зависимости и собирает TypeScript
3. **npm start** - запускает скомпилированное приложение
4. **Environment Variables** - конфигурация для продакшена

---

## 🎯 **Итоговые настройки:**

```cmd
Source Code:
- Git Provider: Public Git Repository ✅
- Repository: https://github.com/Akilak11/entertainment-portal ✅

Settings:
- Name: entertainment-portal ✅
- Language: Node (исправьте!)
- Branch: main ✅
- Region: Frankfurt (EU Central) ✅
- Root Directory: (пустое) ✅

Build Settings:
- Build Command: npm install && npm run build (исправьте!)
- Start Command: npm start (исправьте!)

Environment Variables: (добавьте вышеуказанные)
Instance Type: Free ✅
```

**Теперь нажмите "Deploy Web Service" и Render развернет ваш портал!** 🚀

