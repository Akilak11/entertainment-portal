'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Перенаправляем если уже аутентифицирован
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      console.log('🔄 User already authenticated, redirecting to home');
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.email || !formData.password) {
      setError('Заполните все поля');
      return;
    }

    setIsSubmitting(true);

    try {
      await login(formData.email, formData.password, formData.rememberMe);
      setSuccess('Вход выполнен успешно!');

      // Перенаправляем на главную страницу через 2 секунды
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error: any) {
      console.error('Ошибка входа:', error);
      setError(error.message || 'Произошла ошибка при входе');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="fas fa-sign-in-alt fa-3x text-primary mb-3"></i>
                <h2 className="mb-2">Вход в аккаунт</h2>
                <p className="text-muted">Добро пожаловать обратно!</p>
              </div>

              <form onSubmit={handleLogin}>
                {/* Сообщения об успехе и ошибках */}
                {error && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}
                {success && (
                  <div className="alert alert-success" role="alert">
                    <i className="fas fa-check-circle me-2"></i>
                    {success}
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="Введите ваш email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Пароль</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    placeholder="Введите пароль"
                    required
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange('rememberMe')}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Запомнить меня
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                  disabled={!formData.email || !formData.password || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Вход...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Войти
                    </>
                  )}
                </button>

                <div className="text-center">
                  <a href="/register" className="text-decoration-none">
                    Нет аккаунта? Зарегистрироваться
                  </a>
                </div>
              </form>

              {/* Альтернативные способы входа */}
              <hr className="my-4" />
              <div className="text-center mb-3">
                <small className="text-muted">Или войдите через</small>
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-outline-danger">
                  <i className="fab fa-google me-2"></i>
                  Google
                </button>
                <button className="btn btn-outline-primary">
                  <i className="fab fa-vk me-2"></i>
                  VK
                </button>
                <button className="btn btn-outline-info">
                  <i className="fab fa-telegram me-2"></i>
                  Telegram
                </button>
              </div>

              {/* Ссылка на восстановление пароля */}
              <div className="text-center mt-3">
                <a href="/forgot-password" className="text-decoration-none small text-muted">
                  Забыли пароль?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
