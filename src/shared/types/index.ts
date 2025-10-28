// Общие типы для всего приложения

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  bio?: string;
  isVerified: boolean;
  role: 'user' | 'moderator' | 'admin';
  passwordHash?: string; // Для внутренней логики аутентификации
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls: string[];
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  parentId?: string;
  content: string;
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumTopic {
  id: string;
  forumId: string;
  userId: string;
  title: string;
  content: string;
  viewsCount: number;
  messagesCount: number;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WikiArticle {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  viewsCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Формы аутентификации
export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  firstName?: string;
  lastName?: string;
}

// OAuth
export interface OAuthProvider {
  name: 'google' | 'vk' | 'yandex';
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}
