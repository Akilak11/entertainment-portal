'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  bio?: string;
  isVerified: boolean;
  role: 'user' | 'moderator' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface RegisterData {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Проверка токена при загрузке приложения
  useEffect(() => {
    const checkAuth = async () => {
      console.log('🔍 Checking auth on app load...');
      const token = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      console.log('📦 Stored tokens:', {
        accessToken: token ? 'present' : 'missing',
        refreshToken: refreshToken ? 'present' : 'missing'
      });

      if (token) {
        try {
          console.log('🔐 Validating access token...');
          // Проверяем токен на сервере
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          console.log('📡 /api/auth/me response:', response.status);

          if (response.ok) {
            const data = await response.json();
            console.log('✅ Token valid, setting user:', data.data.user);
            setUser(data.data.user);
          } else {
            console.log('❌ Token invalid, trying refresh...');
            // Токен недействителен, пытаемся обновить
            const refreshed = await refreshToken();
            if (!refreshed) {
              console.log('❌ Refresh failed, logging out');
              logout();
            }
          }
        } catch (error) {
          console.error('❌ Error checking auth:', error);
          logout();
        }
      } else {
        console.log('ℹ️ No access token found');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        setUser(data.data.user);
        return true;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
    return false;
  };

  const login = async (email: string, password: string, rememberMe = false) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, rememberMe })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Ошибка входа');
      }

      const { user, accessToken, refreshToken } = data.data;

      // Сохраняем токены
      console.log('💾 Saving tokens to localStorage:', { accessToken: 'present', refreshToken: 'present' });
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Устанавливаем пользователя
      console.log('👤 Setting user in state:', user);
      setUser(user);

    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Ошибка регистрации');
      }

      // После успешной регистрации автоматически входим
      await login(userData.email, userData.password);

    } catch (error: any) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('🚪 Logging out, clearing tokens and state');

    // Очищаем локальное хранилище
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    console.log('🗑️ Cleared localStorage tokens');

    // Сбрасываем состояние
    setUser(null);
    console.log('🔄 Reset user state to null');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return;

    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('Не авторизован');

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Ошибка обновления профиля');
      }

      // Обновляем пользователя в состоянии
      setUser({ ...user, ...result.data });

    } catch (error: any) {
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
