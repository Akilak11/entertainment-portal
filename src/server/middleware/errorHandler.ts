import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/shared/types';

export class AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.name = 'AppError';
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const appError = err as AppError;
  const statusCode = appError.statusCode || 500;
  const message = err.message || 'Внутренняя ошибка сервера';

  // Логирование ошибки
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    timestamp: new Date().toISOString()
  });

  const response: ApiResponse = {
    success: false,
    error: message
  };

  // В режиме разработки добавляем стек ошибки
  if (process.env.NODE_ENV === 'development') {
    response.error = err.stack || message;
  }

  res.status(statusCode).json(response);
};
