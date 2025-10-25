import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Заполните все поля');
      return;
    }

    setIsLoading(true);

    try {
      // В будущем подключить к реальному API
      // const response = await fetch('http://localhost:3000/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     email: formData.email,
      //     password: formData.password,
      //     rememberMe: formData.rememberMe
      //   })
      // });
      // const data = await response.json();

      // Симуляция входа
      setTimeout(() => {
        alert('Вход выполнен! (демо режим)');
        setIsLoading(false);
        // В будущем: router.push('/dashboard')
      }, 1500);

    } catch (error) {
      console.error('Ошибка входа:', error);
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
                <i className="fas fa-sign-in-alt fa-3x text-primary mb-3"></i>
                <h2 className="mb-2">Вход в аккаунт</h2>
                <p className="text-muted">Добро пожаловать обратно!</p>
              </div>

              <form onSubmit={handleLogin}>
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
                  disabled={!formData.email || !formData.password || isLoading}
                >
                  {isLoading ? (
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
