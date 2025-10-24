# 🪟 НАСТРОЙКА РАЗРАБОТКИ НА WINDOWS

## 📋 Необходимые программы для разработки

### 1. **Node.js** (ОБЯЗАТЕЛЬНО)
```cmd
REM Проверка установки:
node --version

REM Если не установлен:
REM 1. Скачайте: https://nodejs.org/
REM 2. Установите LTS версию (20.x)
REM 3. Проверьте: npm --version
```

### 2. **Docker Desktop** (ОБЯЗАТЕЛЬНО для баз данных)
```cmd
REM Проверка установки:
docker --version

REM Если не установлен:
REM 1. Скачайте: https://www.docker.com/products/docker-desktop/
REM 2. Установите и запустите Docker Desktop
REM 3. Войдите в аккаунт Docker Hub
REM 4. Проверьте: docker-compose --version
```

### 3. **Git** (рекомендуется для развертывания)
```cmd
REM Проверка установки:
git --version

REM Если не установлен:
REM 1. Скачайте: https://git-scm.com/download/win
REM 2. Установите с настройками по умолчанию
REM 3. Настройте: git config --global user.name "Your Name"
REM 4. Настройте: git config --global user.email "your.email@example.com"
```

### 4. **Visual Studio Code** (рекомендуется для разработки)
```cmd
REM Скачайте: https://code.visualstudio.com/
REM Установите расширения:
REM - TypeScript Hero
REM - Prettier
REM - ESLint
REM - Docker
REM - Node.js Extension Pack
```

## 🔧 Настройка командной строки

### ВАРИАНТ 1: PowerShell (рекомендуется)
```powershell
# Откройте PowerShell как администратор
Set-ExecutionPolicy RemoteSigned

# Проверьте кодировку
chcp 65001

# Перейдите в проект
cd SocialShop

# Установите зависимости
npm install
```

### ВАРИАНТ 2: Командная строка (CMD)
```cmd
REM Откройте CMD от имени администратора
REM Перейдите в проект
cd SocialShop

REM Установите зависимости
npm install
```

## 🚀 Запуск проекта

### Автоматический запуск (рекомендуется):
```cmd
REM Используйте готовый скрипт
start-dev.bat
```

### Ручной запуск:
```cmd
REM 1. Запустите базы данных
docker-compose up postgres redis -d

REM 2. Дождитесь запуска (15 секунд)
timeout /t 15 /nobreak

REM 3. Создайте базу данных
docker exec socialshop-postgres-1 createdb entertainment_portal

REM 4. Запустите сервер
start "Server" npm run dev

REM 5. В новом окне запустите клиент
start "Client" cmd /c "cd src\client && npm install && npm run dev"
```

## 🌐 Доступ к сервисам:

- **Главная страница:** http://localhost:3001
- **API сервер:** http://localhost:3000/health
- **База данных (PgAdmin):** http://localhost:5050
  - Email: admin@admin.com
  - Password: admin
- **Файлы (MinIO):** http://localhost:9001
  - Username: minioadmin
  - Password: minioadmin
- **Переводчик:** http://localhost:5000

## 🛠️ Команды для разработки:

```cmd
REM Проверка состояния
docker-compose ps

REM Просмотр логов сервера
docker-compose logs server

REM Остановка всех сервисов
docker-compose down

REM Остановка и очистка
docker-compose down -v

REM Перезапуск конкретного сервиса
docker-compose restart postgres
```

## 🔍 Поиск и устранение проблем:

### Проблема: Порт уже используется
```cmd
REM Проверьте какие процессы используют порты
netstat -ano | findstr :3000
netstat -ano | findstr :3001

REM Убейте процесс (замените PID на реальный)
taskkill /PID 1234 /F
```

### Проблема: Docker не запускается
```cmd
REM Проверьте статус Docker Desktop
REM Убедитесь что virtualization включена в BIOS
REM Перезагрузите компьютер
```

### Проблема: Ошибки в коде
```cmd
REM Проверьте TypeScript
npm run type-check

REM Проверьте линтинг
npm run lint

REM Сборка проекта
npm run build
```

## 📦 Обновление зависимостей:

```cmd
REM Обновить все пакеты
npm update

REM Обновить конкретный пакет
npm install package-name@latest

REM Проверить уязвимости
npm audit
npm audit fix
```

## 🚀 Развертывание:

```cmd
REM Используйте готовый скрипт
deploy.bat

REM Или разверните вручную на выбранную платформу:
REM Railway, Render, Google Cloud
```

## 💡 Советы для Windows:

1. **Используйте PowerShell** - лучше поддержка цветов и Unicode
2. **Запускайте от имени администратора** - для Docker и сетевых команд
3. **Используйте WSL2** - если хотите Unix-подобную среду
4. **Настройте кодировку UTF-8** - для корректного отображения текста
5. **Добавьте в PATH** - если команды не находятся

## 🔗 Полезные ссылки:

- **Node.js:** https://nodejs.org/
- **Docker Desktop:** https://www.docker.com/products/docker-desktop/
- **Git:** https://git-scm.com/download/win
- **VS Code:** https://code.visualstudio.com/
- **PowerShell:** Уже установлен в Windows

**Готово к разработке на Windows! 🎉**


