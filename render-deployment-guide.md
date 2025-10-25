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
JWT_SECRET=your-super-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here
LIBRETRANSLATE_API_URL=https://libretranslate.de/translate
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

### 2.5 Обновите переменные окружения
В Web Service settings добавьте:
```env
DATABASE_URL=${{ entertainment-portal-db.DATABASE_URL }}
REDIS_URL=${{ entertainment-portal-redis.REDIS_URL }}
```

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
