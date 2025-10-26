# 🚀 Развертывание на Render - ПОДРОБНАЯ ИНСТРУКЦИЯ

## ✅ **Render - лучший выбор для вашего портала!**

Render предоставляет:
- **Free план:** 512МБ RAM, 100ГБ трафика, PostgreSQL + Redis
- **Professional:** $19/месяц для большего трафика и team features
- **Полная поддержка** Node.js + Next.js + баз данных

---

## 📋 **ШАГ 1: Подготовка**

### 1.1 Создайте GitHub репозиторий (уже сделано)
- ✅ Репозиторий: https://github.com/Akilak11/entertainment-portal
- ✅ Код загружен и протестирован

### 1.2 Настройте переменные окружения
Создайте `.env` файл в корне проекта:
```env
NODE_ENV=production
JWT_SECRET=your-super-secret-key-here-generate-random
JWT_REFRESH_SECRET=your-refresh-secret-key-here-different
LIBRETRANSLATE_API_URL=https://libretranslate.de/translate
```

---

## 📋 **ШАГ 2: Развертывание на Render**

### 2.1 Зарегистрируйтесь в Render
1. Перейдите: https://render.com/
2. Зарегистрируйтесь через GitHub (рекомендуется)

### 2.2 Создайте Web Service
1. В Dashboard нажмите **"New"** → **"Web Service"**
2. Выберите **"Build and deploy from a Git repository"**
3. Подключите GitHub и выберите `entertainment-portal`

### 2.3 Настройте Web Service (как на скриншоте)

**Основные настройки:**
- **Name:** `entertainment-portal` (или любое имя)
- **Language:** `Node` (автоматически определится)
- **Branch:** `main`
- **Region:** `Oregon (US West)` (или любой другой)
- **Root Directory:** Оставьте пустым (корень репозитория)

**Build Settings:**
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

**Environment Variables (добавьте эти):**
```env
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-here-generate-random-string-minimum-32-characters-long
JWT_REFRESH_SECRET=your-refresh-secret-key-here-different-random-string-minimum-32-characters-long
LIBRETRANSLATE_API_URL=https://libretranslate.de/translate
```

**💡 Генерация ключей:** Запустите `.\generate-secrets.bat` для генерации уникальных ключей

**Пример сгенерированных ключей:**
```env
JWT_SECRET=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
JWT_REFRESH_SECRET=xyz987wvu654tsr321qpo098mlk765jih432gfe109dcb876
```

**⚠️ ВАЖНО:** После создания баз данных добавьте их URL в переменные окружения:
```env
DATABASE_URL=${{ entertainment-portal-db.DATABASE_URL }}
REDIS_URL=${{ entertainment-portal-redis.REDIS_URL }}
```

### 2.4 Создайте базы данных
1. В Dashboard нажмите **"New"** → **"PostgreSQL"**
2. Выберите **Free** план
3. Назовите `entertainment-portal-db`
4. Скопируйте `DATABASE_URL` из настроек

5. Аналогично создайте **Redis**:
   - **"New"** → **"Key Value"**
   - Выберите **Free** план
   - Назовите `entertainment-portal-redis`
   - Скопируйте `REDIS_URL`

### 2.5 Подключите базы данных
В Environment Variables добавьте:
```env
DATABASE_URL=${{ entertainment-portal-db.DATABASE_URL }}
REDIS_URL=${{ entertainment-portal-redis.REDIS_URL }}
```

### 2.6 Настройте Advanced (продвинутые настройки)

**Secret Files:** Не нужны для JWT ключей (используйте Environment Variables)

**Health Check Path:** `/health` ✅ (уже заполнен правильно)

**Pre-Deploy Command:** Оставьте пустым ✅ (не нужен для этого проекта)

**Auto-Deploy:** `On Commit` ✅ (автоматическое развертывание при push в Git)

**Build Filters:** Оставьте по умолчанию ✅ (Included Paths и Ignored Paths пустые)

**💡 Ничего дополнительно заполнять не нужно!**

---

## 🌐 **ШАГ 3: Результат**

После развертывания Render предоставит:
- **URL портала:** https://entertainment-portal.onrender.com
- **API:** https://entertainment-portal.onrender.com/api/posts
- **Health check:** https://entertainment-portal.onrender.com/health

---

## 💰 **Стоимость**

### Free план (рекомендуется для старта):
- ✅ **Web Service:** 512МБ RAM, 100ГБ трафика
- ✅ **PostgreSQL:** 256МБ RAM, 100 подключений
- ✅ **Redis:** 25МБ RAM, 50 подключений
- ✅ **SSL сертификаты**
- ✅ **Глобальная сеть**
- **Итого: $0/месяц**

### Professional ($19/месяц):
- ✅ Всё из Free
- ✅ **500ГБ трафика**
- ✅ **Team collaboration**
- ✅ **Private links**
- ✅ **Chat support**

---

## 🔧 **Настройка после развертывания**

### 3.1 Проверьте работу
1. Откройте https://entertainment-portal.onrender.com
2. Зарегистрируйтесь как пользователь
3. Создайте посты и проверьте функции

### 3.2 Мониторинг
- **Dashboard:** https://dashboard.render.com/
- **Логи:** Services → entertainment-portal → Logs
- **Метрики:** Services → entertainment-portal → Metrics

### 3.3 Обновление
При push в GitHub Render автоматически переразвернет:
```cmd
git add .
git commit -m "Обновления"
git push origin main
```

---

## 🆘 **Если что-то не работает**

1. **Проверьте логи:** Dashboard → Logs
2. **Health check:** Откройте /health
3. **Переменные окружения:** Убедитесь что все добавлены
4. **Базы данных:** Проверьте подключение к PostgreSQL/Redis
5. **Переразверните:** Dashboard → Redeploy

---

## 🎉 **ГОТОВО!**

**Ваш развлекательный портал развернут на Render БЕСПЛАТНО!**

**URL:** https://entertainment-portal.onrender.com
**API:** https://entertainment-portal.onrender.com/api/posts
**Базы данных:** PostgreSQL + Redis

**Теперь у вас есть полноценный портал в интернете!** 🚀

---

## 📚 **Документация Render**
- **Официальная:** https://render.com/docs
- **Сообщество:** https://community.render.com/
- **Статус:** https://status.render.com/
