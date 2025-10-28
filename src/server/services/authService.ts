import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { LoginForm, RegisterForm, User } from '@/shared/types';
import { AppError } from '../middleware/errorHandler';
import { UserModel } from '../models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';

export const login = async (
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
  // Ищем пользователя в базе данных
  const user = await UserModel.findByEmail(email);
  if (!user) {
    throw new AppError('Неверный email или пароль', 401);
  }

  // Проверяем пароль
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash || '');
  if (!isPasswordValid) {
    throw new AppError('Неверный email или пароль', 401);
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id, rememberMe);

  // Убираем passwordHash из ответа
  const { passwordHash, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken
  };
};

export const register = async (userData: RegisterForm): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
  const { email, username, password, firstName, lastName } = userData;

  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // Создаем пользователя в базе данных
  const user = await UserModel.create({
    email,
    username,
    passwordHash,
    firstName,
    lastName
  });

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  // Убираем passwordHash из ответа
  const { passwordHash, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    accessToken,
    refreshToken
  };
};

const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET as Secret);
};

const generateRefreshToken = (userId: string, rememberMe: boolean = false): string => {
  return jwt.sign({ userId, rememberMe }, JWT_REFRESH_SECRET as Secret);
};

export const verifyToken = (token: string, isRefresh: boolean = false): { userId: string } => {
  const secret = isRefresh ? JWT_REFRESH_SECRET : JWT_SECRET;

  try {
    const decoded = jwt.verify(token, secret as Secret) as { userId: string };
    return decoded;
  } catch (error) {
    throw new AppError('Неверный токен', 401);
  }
};
