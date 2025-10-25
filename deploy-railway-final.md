# 🚂 Развертывание на Railway - ФИНАЛЬНАЯ ИНСТРУКЦИЯ

## ✅ **Готово к развертыванию!**

Ваш портал полностью протестирован и загружен на GitHub. Теперь развернем на Railway (бесплатно).

---

## 📋 **ШАГ 1: Подключите репозиторий в Railway**

1. **Откройте Railway Dashboard:** https://railway.app/
2. **Войдите через GitHub** (если еще не вошли)
3. **Создайте новый проект:** "New Project"
4. **Выберите "Deploy from GitHub"**
5. **Найдите и выберите** `entertainment-portal` репозиторий
6. **Railway автоматически начнет развертывание**

---

## 📋 **ШАГ 2: Настройте переменные окружения**

В Railway Dashboard перейдите в **Project Settings > Variables**:

```env
NODE_ENV=production
JWT_SECRET=your-super-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key-here
LIBRETRANSLATE_API_URL=https://libretranslate.de/translate
```

---

## 📋 **ШАГ 3: Добавьте базы данных (бесплатно)**

1. **В Railway Dashboard** нажмите "Add Service"
2. **Выберите PostgreSQL** (бесплатно)
3. **Выберите Redis** (бесплатно)
4. **Railway автоматически подключит их к проекту**

---

## 🌐 **Результат развертывания**

После развертывания Railway предоставит URL:
- **Ваш портал:** https://your-app.railway.app
- **API:** https://your-app.railway.app/api/posts
- **Health check:** https://your-app.railway.app/health

---

## 💰 **Что вы получаете БЕСПЛАТНО:**

✅ **512МБ RAM** для сервера
✅ **PostgreSQL база данных**
✅ **Redis кеширование**
✅ **SSL сертификат**
✅ **CDN для статических файлов**
✅ **Автоматическое масштабирование**
✅ **Домен** your-app.railway.app

---

## 🔧 **Если что-то не работает:**

1. **Проверьте логи:** Railway Dashboard > Deployments > Logs
2. **Health check:** Откройте https://your-app.railway.app/health
3. **Переменные окружения:** Убедитесь что все настроены
4. **Переразверните:** Нажмите "Redeploy" в Railway

---

## 🎉 **ГОТОВО!**

**Ваш развлекательный портал развернут в интернете БЕСПЛАТНО!**

**GitHub репозиторий:** https://github.com/Akilak11/entertainment-portal
**Railway проект:** https://railway.app/

**Теперь у вас есть полноценный портал с социальными функциями, форумом, магазином, переводчиком и вики!** 🚀
