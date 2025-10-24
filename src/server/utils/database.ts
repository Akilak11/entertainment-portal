import { Pool } from 'pg';
import { AppError } from '../middleware/errorHandler';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new AppError('DATABASE_URL не настроена', 500);
}

export const pool = new Pool({
  connectionString: databaseUrl,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Обработчик ошибок подключения
pool.on('error', (err) => {
  console.error('Ошибка подключения к базе данных:', err);
  process.exit(1);
});

// Утилита для выполнения запросов
export const query = async (text: string, params?: any[]): Promise<any> => {
  const client = await pool.connect();

  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    console.error('Ошибка выполнения запроса:', error);
    throw new AppError('Ошибка базы данных', 500);
  } finally {
    client.release();
  }
};

// Утилита для транзакций
export const transaction = async (callback: (client: any) => Promise<any>): Promise<any> => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};
