import { createClient } from 'redis';
import { AppError } from '../middleware/errorHandler';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisClient = createClient({
  url: redisUrl
});

redisClient.on('error', (err) => {
  console.error('Ошибка подключения к Redis:', err);
});

// Инициализация подключения
export const connectRedis = async (): Promise<void> => {
  try {
    await redisClient.connect();
    console.log('✅ Подключено к Redis');
  } catch (error) {
    console.error('❌ Ошибка подключения к Redis:', error);
    throw new AppError('Ошибка подключения к Redis', 500);
  }
};

// Утилиты для кеширования
export const setCache = async (key: string, value: any, ttl?: number): Promise<void> => {
  try {
    const serializedValue = JSON.stringify(value);
    if (ttl) {
      await redisClient.setEx(key, ttl, serializedValue);
    } else {
      await redisClient.set(key, serializedValue);
    }
  } catch (error) {
    console.error('Ошибка записи в кеш:', error);
  }
};

export const getCache = async (key: string): Promise<any> => {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Ошибка чтения из кеша:', error);
    return null;
  }
};

export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error('Ошибка удаления из кеша:', error);
  }
};

// Кеширование для сессий
export const setSession = async (sessionId: string, data: any, ttl: number = 86400): Promise<void> => {
  await setCache(`session:${sessionId}`, data, ttl);
};

export const getSession = async (sessionId: string): Promise<any> => {
  return await getCache(`session:${sessionId}`);
};

export const deleteSession = async (sessionId: string): Promise<void> => {
  await deleteCache(`session:${sessionId}`);
};
