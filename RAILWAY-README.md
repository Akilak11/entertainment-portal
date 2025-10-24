# 🚂 Развертывание на Railway (БЕСПЛАТНО)

## 📋 Что такое Railway?

Railway - это бесплатная платформа для развертывания Node.js приложений с автоматическим масштабированием, базами данных и всем необходимым.

**Бесплатно:** 512МБ RAM, 1ГБ storage, PostgreSQL, Redis

## 🚀 Быстрое развертывание (3 минуты)

### ВАРИАНТ 1: Через CLI (Windows)
```cmd
REM 1. Установите Railway CLI
npm install -g @railway/cli

REM 2. Зарегистрируйтесь: https://railway.app/
REM 3. Войдите в аккаунт (используйте браузер)
.\railway.bat login

REM 4. Инициализируйте проект
.\railway.bat init

REM 5. Разверните
.\railway.bat up
```

### ВАРИАНТ 2: Через GitHub (рекомендуется)
```cmd
REM 1. Настройте Git и создайте репозиторий
.\github-setup.bat

REM 2. В Railway Dashboard:
REM    - Создайте New Project
REM    - Выберите "Deploy from GitHub"
REM    - Подключите ваш entertainment-portal репозиторий
REM    - Railway автоматически развернет проект

REM 3. Настройте переменные окружения в Railway:
NODE_ENV=production
JWT_SECRET=your-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
```

## 🔧 Настройка переменных окружения

После развертывания настройте в Railway Dashboard:

```env
NODE_ENV=production
DATABASE_URL=postgresql://[user]:[pass]@[host]:5432/railway
REDIS_URL=redis://[host]:6379
JWT_SECRET=your-super-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
LIBRETRANSLATE_API_URL=https://libretranslate.de/translate
```

## 🌐 Доступ к развернутому приложению

После развертывания Railway предоставит URL:
- **Основной сайт:** https://your-app.railway.app
- **API:** https://your-app.railway.app/api/posts
- **Health check:** https://your-app.railway.app/health

## 📊 Мониторинг

Railway предоставляет:
- ✅ Логи в реальном времени
- ✅ Метрики использования
- ✅ Автоматическое резервное копирование
- ✅ SSL сертификаты бесплатно

## 💰 Стоимость

**БЕСПЛАТНО навсегда:**
- 512МБ RAM
- 1ГБ storage
- PostgreSQL база данных
- Redis кеширование
- 100ГБ bandwidth

**Платно (при росте):**
- от 5$/мес за дополнительные ресурсы
- Автоматическое масштабирование

## 🔄 Обновление развернутого приложения

```cmd
REM Загрузите изменения в GitHub
git add .
git commit -m "Обновления"
git push origin main

REM Railway автоматически переразвернет
```

## 🆘 Устранение проблем

### Сервер не отвечает
```cmd
REM Проверьте логи в Railway Dashboard
REM Убедитесь что все переменные окружения настроены
```

### База данных не подключается
```cmd
REM Проверьте DATABASE_URL в Railway Dashboard
REM Убедитесь что PostgreSQL сервис создан
```

### Порт уже используется
```cmd
REM Railway автоматически назначает порты
REM Не указывайте PORT в переменных окружения
```

## 📚 Дополнительные ресурсы

- **Документация Railway:** https://docs.railway.app/
- **Сообщество:** https://discord.gg/railway
- **Статус сервисов:** https://status.railway.app/

## 🎯 Итог

Railway - идеальный выбор для вашего развлекательного портала:
- ✅ Бесплатно для MVP
- ✅ Автоматическое развертывание
- ✅ Встроенные базы данных
- ✅ Простая настройка
- ✅ Отличная документация

**Рекомендуется для начинающих и продакшена!** 🚀
