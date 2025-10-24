import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler';

// Схема валидации для логина
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Некорректный email адрес',
    'any.required': 'Email обязателен'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Пароль должен содержать минимум 6 символов',
    'any.required': 'Пароль обязателен'
  }),
  rememberMe: Joi.boolean().optional()
});

// Схема валидации для регистрации
const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Некорректный email адрес',
    'any.required': 'Email обязателен'
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': 'Username может содержать только буквы и цифры',
    'string.min': 'Username должен содержать минимум 3 символа',
    'string.max': 'Username не может превышать 30 символов',
    'any.required': 'Username обязателен'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Пароль должен содержать минимум 6 символов',
    'any.required': 'Пароль обязателен'
  }),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': 'Пароли не совпадают',
    'any.required': 'Подтверждение пароля обязательно'
  }),
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional()
});

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    throw new AppError(error.details[0].message, 400);
  }

  next();
};
