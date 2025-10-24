# 🚂 Развертывание на Railway - ПОШАГОВАЯ ИНСТРУКЦИЯ

## ✅ **Готово к развертыванию!**

Ваш развлекательный портал полностью настроен и протестирован. Railway - лучший выбор для бесплатного развертывания.

---

## 📋 **ШАГ 1: Создайте репозиторий на GitHub**

1. **Перейдите:** https://github.com/new
2. **Заполните:**
   - Repository name: `entertainment-portal`
   - Description: `Развлекательный портал-агрегатор`
   - Сделайте **Public** (публичным)
   - **НЕ добавляйте** README или .gitignore
3. **Нажмите "Create repository"**

---

## 📋 **ШАГ 2: Настройте Git**

```cmd
REM 1. Войдите в папку проекта
cd C:\socialnetwork\SocialShop

REM 2. Инициализируйте Git (если еще не сделано)
.\github-setup.bat

REM 3. Добавьте ваш GitHub репозиторий
git remote add origin https://github.com/YOUR_USERNAME/entertainment-portal.git

REM 4. Загрузите код
git push -u origin main
```

---

## 📋 **ШАГ 3: Разверните на Railway**

### ВАРИАНТ 1: Через GitHub (рекомендуется)
```cmd
1. Откройте: https://railway.app/
2. Войдите через GitHub (если еще не вошли)
3. Нажмите "New Project"
4. Выберите "Deploy from GitHub"
5. Найдите и выберите "entertainment-portal"
6. Railway начнет развертывание автоматически
```

### ВАРИАНТ 2: Через CLI
```cmd
REM 1. Установите Railway CLI (уже установлено)
npm install -g @railway/cli

REM 2. Войдите через браузер
.\railway.bat login

REM 3. Инициализируйте проект
.\railway.bat init

REM 4. Разверните
.\railway.bat up
```

---

## 📋 **ШАГ 4: Настройте переменные окружения**

В Railway Dashboard перейдите в **Project Settings > Variables**:

```env
NODE_ENV=production
JWT_SECRET=your-super-secret-key-here-generate-random-string
JWT_REFRESH_SECRET=your-refresh-secret-key-here-different-string
LIBRETRANSLATE_API_URL=https://libretranslate.de/translate
```

---

## 📋 **ШАГ 5: Проверьте развертывание**

После развертывания Railway предоставит URL:
- **Ваш портал:** https://your-app.railway.app
- **API:** https://your-app.railway.app/api/posts
- **Health check:** https://your-app.railway.app/health

---

## 🎯 **ЧТО ВЫ ПОЛУЧИТЕ БЕСПЛАТНО:**

✅ **512МБ RAM** - достаточно для начала
✅ **PostgreSQL база данных** - для хранения данных
✅ **Redis кеширование** - для скорости
✅ **SSL сертификат** - безопасность
✅ **CDN** - быстрая загрузка
✅ **Автоматическое масштабирование** - при росте трафика
✅ **Логи в реальном времени** - мониторинг

---

## 🔧 **Если что-то не работает:**

1. **Проверьте логи:** Railway Dashboard > Deployments > Logs
2. **Health check:** Откройте https://your-app.railway.app/health
3. **Переменные окружения:** Убедитесь что все настроены
4. **Переразверните:** Нажмите "Redeploy" в Railway

---

## 🚀 **После успешного развертывания:**

1. **Откройте портал** в браузере
2. **Зарегистрируйтесь** как пользователь
3. **Создайте посты** и проверьте лайки/комментарии
4. **Проверьте форум** - создайте топики
5. **Поделитесь ссылкой** с друзьями

---

## 💰 **Масштабирование (когда вырастите):**

Railway автоматически масштабирует ресурсы при росте трафика:
- **1-100 пользователей:** Бесплатно
- **100-1000 пользователей:** ~5$/мес
- **1000+ пользователей:** ~20$/мес

---

## 📚 **Документация:**

- **Railway инструкция:** [RAILWAY-README.md](RAILWAY-README.md)
- **GitHub настройка:** [GITHUB-README.md](GITHUB-README.md)
- **Общая документация:** [README.md](README.md)

---

**🎉 Ваш развлекательный портал готов к развертыванию!**

**Следуйте шагам выше и через 5 минут ваш портал будет доступен в интернете бесплатно!**
