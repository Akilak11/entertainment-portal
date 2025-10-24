# Multi-stage build для сервера
FROM node:20-alpine AS server-builder

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package*.json ./
RUN npm ci --only=production

# Копируем исходный код
COPY src/server ./src/server
COPY src/shared ./src/shared
COPY tsconfig.json ./

# Компилируем TypeScript
RUN npm run build:server

# Production stage для сервера
FROM node:20-alpine AS server

WORKDIR /app

# Копируем зависимости и скомпилированный код
COPY --from=server-builder /app/dist ./dist
COPY --from=server-builder /app/node_modules ./node_modules

# Копируем переменные окружения
COPY env.example .env

# Создаем пользователя без root прав
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Создаем необходимые директории
RUN mkdir -p uploads temp logs
RUN chown -R nodejs:nodejs uploads temp logs

USER nodejs

EXPOSE 3000

CMD ["node", "dist/server/index.js"]
