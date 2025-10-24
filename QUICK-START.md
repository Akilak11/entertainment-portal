# ⚡ БЫСТРЫЙ СТАРТ (5 МИНУТ) - WINDOWS

## 🚀 Самое важное - команды для запуска:

### ВАРИАНТ 1: Через PowerShell (рекомендуется)
```powershell
# 1. Войдите в папку проекта
cd SocialShop

# 2. Запустите всё автоматически
.\start-dev.bat

# 3. Или запустите по частям:
npm install
docker-compose up -d
npm run dev
cd src\client
npm install
npm run dev
```

### ВАРИАНТ 2: Через Командную строку
```cmd
REM 1. Войдите в папку проекта
cd SocialShop

REM 2. Запустите всё автоматически
start-dev.bat

REM 3. Или запустите по частям:
npm install
docker-compose up -d
npm run dev
cd src\client
npm install
npm run dev
```

## 🌐 Доступ к сервисам:

- **Главная страница:** http://localhost:3001
- **API сервер:** http://localhost:3000/health
- **База данных (PgAdmin):** http://localhost:5050 (admin@admin.com / admin)
- **Файлы (MinIO):** http://localhost:9001 (minioadmin / minioadmin)
- **Переводчик:** http://localhost:5000

## 💰 БЕСПЛАТНОЕ РАЗВЕРТЫВАНИЕ:

```cmd
REM 1. Сделайте проект публичным на GitHub
REM 2. Используйте скрипт развертывания
deploy.bat

REM 3. Выберите платформу:
REM - Railway: https://railway.app/ (бесплатно)
REM - Render: https://render.com/ (бесплатно)
REM - Google Cloud: https://cloud.google.com/ (бесплатно, 300$ кредит)
```

## 🛠️ РАЗРАБОТКА MVP:

```cmd
REM Настройте MVP функции
mvp-setup.bat

REM Проверьте что всё работает
test-setup.bat
```

## 📋 ЧТО УЖЕ ГОТОВО:

✅ **Backend:** Node.js + Express + TypeScript
✅ **Frontend:** Next.js 14 + React + TypeScript
✅ **База данных:** PostgreSQL с миграциями
✅ **Кеширование:** Redis
✅ **Файлы:** MinIO (S3 совместимый)
✅ **Переводы:** LibreTranslate API
✅ **API:** Все endpoints (auth, posts, forum, shop, wiki)
✅ **Docker:** Полная контейнеризация
✅ **Документация:** Подробные инструкции

## 🎯 СЛЕДУЮЩИЕ ШАГИ:

1. **Настройте .env:** `cp env.example .env`
2. **Реализуйте аутентификацию:** TODO список в project-documentation.md
3. **Добавьте UI компоненты:** в src/client/src/components/
4. **Разверните бесплатно:** используйте deploy.sh

## 📚 ДОКУМЕНТАЦИЯ:

- **Подробный план:** implementation-plan.md
- **Архитектура:** project-documentation.md
- **API:** README.md

**Готово к разработке! 🚀**
