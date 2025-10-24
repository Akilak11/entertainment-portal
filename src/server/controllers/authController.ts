import { Request, Response, NextFunction } from 'express';
import { login as loginService, register as registerService } from '../services/authService';
import { UserModel } from '../models/User';
import { ApiResponse, LoginForm, RegisterForm } from '@/shared/types';
import { AppError } from '../middleware/errorHandler';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, rememberMe }: LoginForm = req.body;

    const result = await loginService(email, password, rememberMe);

    const response: ApiResponse = {
      success: true,
      data: result,
      message: 'Успешный вход в систему'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userData: RegisterForm = req.body;

    const result = await registerService(userData);

    const response: ApiResponse = {
      success: true,
      data: result,
      message: 'Регистрация успешна'
    };

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new AppError('Refresh token обязателен', 400);
    }

    // TODO: Implement refresh token logic
    const response: ApiResponse = {
      success: true,
      message: 'Token refreshed'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // TODO: Implement logout logic (invalidate tokens)
    const response: ApiResponse = {
      success: true,
      message: 'Выход выполнен успешно'
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};
