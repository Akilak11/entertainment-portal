import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      alert('Пароль должен содержать минимум 6 символов');
      return;
    }

    setIsLoading(true);

    try {
      // В будущем подключить к реальному API
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      // const data = await response.json();

      // Симуляция регистрации
      setTimeout(() => {
        alert('Регистрация выполнена! (демо режим)');
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Ошибка регистрации:', error);
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
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="firstName" className="form-label">Имя</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      placeholder="Введите имя"
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="lastName" className="form-label">Фамилия</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      placeholder="Введите фамилию"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Имя пользователя</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange('username')}
                    placeholder="Придумайте уникальное имя"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="Введите email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Пароль</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    placeholder="Минимум 6 символов"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Подтверждение пароля</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    placeholder="Повторите пароль"
                    required
                  />
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="agree" required />
                  <label className="form-check-label" htmlFor="agree">
                    Согласен с <a href="#" className="text-decoration-none">правилами использования</a>
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100 mb-3"
                  disabled={!formData.firstName || !formData.lastName || !formData.username ||
                           !formData.email || !formData.password || !formData.confirmPassword || isLoading}
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
