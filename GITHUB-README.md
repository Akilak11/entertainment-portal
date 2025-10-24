# 🔗 Настройка GitHub для Railway

## 📋 Что нужно сделать:

### 1. Создайте репозиторий на GitHub
```cmd
1. Перейдите: https://github.com/new
2. Введите название: entertainment-portal
3. Описание: Развлекательный портал-агрегатор
4. Сделайте публичным (Public)
5. НЕ добавляйте README или .gitignore (у нас уже есть)
6. Нажмите "Create repository"
```

### 2. Подключите локальный репозиторий к GitHub
```cmd
REM Войдите в папку проекта
cd C:\socialnetwork\SocialShop

REM Добавьте удаленный репозиторий (замените YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/entertainment-portal.git

REM Загрузите код на GitHub
git push -u origin main
```

### 3. Подключите к Railway
```cmd
1. Откройте Railway Dashboard: https://railway.app/
2. Нажмите "New Project"
3. Выберите "Deploy from GitHub"
4. Найдите и выберите репозиторий "entertainment-portal"
5. Railway автоматически начнет развертывание
```

### 4. Настройте переменные окружения
В Railway Dashboard перейдите в Project Settings > Variables:

```env
NODE_ENV=production
JWT_SECRET=your-super-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-here
LIBRETRANSLATE_API_URL=https://libretranslate.de/translate
```

## 🌐 Результат

После развертывания вы получите:
- **Основной сайт:** https://your-app.railway.app
- **API:** https://your-app.railway.app/api/posts
- **Health check:** https://your-app.railway.app/health

## 🔧 Обновление развернутого приложения

```cmd
REM Внесите изменения в код
REM Загрузите на GitHub
git add .
git commit -m "Обновления"
git push origin main

REM Railway автоматически переразвернет
```

## 💰 Стоимость

**БЕСПЛАТНО:**
- 512МБ RAM
- 1ГБ storage
- PostgreSQL база данных
- Redis кеширование
- 100ГБ трафика в месяц

**При росте:** от 5$/мес

## 📚 Полезные ссылки

- **GitHub:** https://github.com/
- **Railway:** https://railway.app/
- **Документация Railway:** https://docs.railway.app/

**Готово к развертыванию!** 🚀
