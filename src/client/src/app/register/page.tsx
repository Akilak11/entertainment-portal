'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreeToTerms: false
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleInputBlur = (field: string) => () => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeToTerms(e.target.checked);
    setTouchedFields(prev => ({
      ...prev,
      agreeToTerms: true
    }));
  };

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!agreeToTerms) {
      setError('Необходимо согласиться с правилами использования');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    // Проверка username (только буквы и цифры)
    if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      setError('Username может содержать только буквы и цифры');
      return;
    }

    if (formData.username.length < 3) {
      setError('Username должен содержать минимум 3 символа');
      return;
    }

    if (formData.username.length > 30) {
      setError('Username не может превышать 30 символов');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      });

      setSuccess('Регистрация успешна! Выполняется автоматический вход...');

      // Очистить форму
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // AuthContext автоматически выполнит вход после регистрации
      // Перенаправление произойдет в AuthContext

    } catch (error: any) {
      console.error('Ошибка регистрации:', error);
      setError(error.message || 'Произошла ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="fas fa-user-plus fa-3x text-success mb-3"></i>
                <h2 className="mb-2">Создать аккаунт</h2>
                <p className="text-muted">Присоединяйтесь к нашему сообществу</p>
              </div>

              <form onSubmit={handleRegister}>
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

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">
                      Имя {!formData.firstName && <span className="text-danger">*</span>}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        touchedFields.firstName
                          ? (formData.firstName ? 'is-valid' : 'is-invalid')
                          : ''
                      }`}
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      onBlur={handleInputBlur('firstName')}
                      placeholder="Введите имя"
                      required
                    />
                    {touchedFields.firstName && !formData.firstName && (
                      <div className="invalid-feedback">Имя обязательно для заполнения</div>
                    )}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">
                      Фамилия {!formData.lastName && <span className="text-danger">*</span>}
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        touchedFields.lastName
                          ? (formData.lastName ? 'is-valid' : 'is-invalid')
                          : ''
                      }`}
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      onBlur={handleInputBlur('lastName')}
                      placeholder="Введите фамилию"
                      required
                    />
                    {touchedFields.lastName && !formData.lastName && (
                      <div className="invalid-feedback">Фамилия обязательна для заполнения</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Имя пользователя {!formData.username && <span className="text-danger">*</span>}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      touchedFields.username
                        ? (formData.username ? 'is-valid' : 'is-invalid')
                        : ''
                    }`}
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange('username')}
                    onBlur={handleInputBlur('username')}
                    placeholder="Придумайте уникальное имя"
                    required
                  />
                  {touchedFields.username && !formData.username && (
                    <div className="invalid-feedback">Username обязателен для заполнения</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email {!formData.email && <span className="text-danger">*</span>}
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      touchedFields.email
                        ? (formData.email ? 'is-valid' : 'is-invalid')
                        : ''
                    }`}
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    onBlur={handleInputBlur('email')}
                    placeholder="Введите email"
                    required
                  />
                  {touchedFields.email && !formData.email && (
                    <div className="invalid-feedback">Email обязателен для заполнения</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Пароль {!formData.password && <span className="text-danger">*</span>}
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      touchedFields.password
                        ? (formData.password ? 'is-valid' : 'is-invalid')
                        : ''
                    }`}
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    onBlur={handleInputBlur('password')}
                    placeholder="Минимум 6 символов"
                    required
                  />
                  {touchedFields.password && !formData.password && (
                    <div className="invalid-feedback">Пароль обязателен для заполнения</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Подтверждение пароля {!formData.confirmPassword && <span className="text-danger">*</span>}
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      touchedFields.confirmPassword
                        ? (formData.confirmPassword ? 'is-valid' : 'is-invalid')
                        : ''
                    }`}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    onBlur={handleInputBlur('confirmPassword')}
                    placeholder="Повторите пароль"
                    required
                  />
                  {touchedFields.confirmPassword && !formData.confirmPassword && (
                    <div className="invalid-feedback">Подтверждение пароля обязательно</div>
                  )}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className={`form-check-input ${agreeToTerms ? 'is-valid' : ''}`}
                    id="agree"
                    checked={agreeToTerms}
                    onChange={handleAgreeChange}
                    required
                  />
                  <label className={`form-check-label ${!agreeToTerms ? 'text-danger' : ''}`} htmlFor="agree">
                    Согласен с <a href="#" className="text-decoration-none">правилами использования</a>
                    {!agreeToTerms && <span className="text-danger">*</span>}
                  </label>
                  {touchedFields.agreeToTerms && !agreeToTerms && (
                    <div className="form-text text-danger">Необходимо согласиться с правилами использования</div>
                  )}
                </div>

                {/* Статус формы */}
                <div className="mb-3 text-center">
                  <small className="text-muted">
                    Имя: {formData.firstName ? '✅' : '❌'} |
                    Фамилия: {formData.lastName ? '✅' : '❌'} |
                    Username: {formData.username ? '✅' : '❌'} |
                    Email: {formData.email ? '✅' : '❌'} |
                    Пароль: {formData.password ? '✅' : '❌'} |
                    Подтверждение: {formData.confirmPassword ? '✅' : '❌'} |
                    Согласие: {agreeToTerms ? '✅' : '❌'}
                  </small>
                </div>

                <button
                  type="submit"
                  className={`btn btn-lg w-100 mb-3 ${
                    (!formData.firstName || !formData.lastName || !formData.username ||
                     !formData.email || !formData.password || !formData.confirmPassword ||
                     !agreeToTerms || isLoading)
                      ? 'btn-secondary'
                      : 'btn-success'
                  }`}
                  disabled={!formData.firstName || !formData.lastName || !formData.username ||
                           !formData.email || !formData.password || !formData.confirmPassword ||
                           !agreeToTerms || isLoading}
                  title={
                    !formData.firstName ? 'Заполните имя' :
                    !formData.lastName ? 'Заполните фамилию' :
                    !formData.username ? 'Заполните username' :
                    !formData.email ? 'Заполните email' :
                    !formData.password ? 'Заполните пароль' :
                    !formData.confirmPassword ? 'Подтвердите пароль' :
                    !agreeToTerms ? 'Согласитесь с правилами' :
                    isLoading ? 'Идет регистрация...' :
                    'Готово к регистрации'
                  }
                >
                  {isLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Создание аккаунта...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-user-plus me-2"></i>
                      Зарегистрироваться
                      {(!formData.firstName || !formData.lastName || !formData.username ||
                        !formData.email || !formData.password || !formData.confirmPassword ||
                        !agreeToTerms) && (
                        <span className="ms-2">🔒</span>
                      )}
                    </>
                  )}
                </button>

                <div className="text-center">
                  <a href="/login" className="text-decoration-none">
                    Уже есть аккаунт? Войти
                  </a>
                </div>
              </form>

              {/* Альтернативные способы регистрации */}
              <hr className="my-4" />
              <div className="text-center mb-3">
                <small className="text-muted">Или зарегистрируйтесь через</small>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
