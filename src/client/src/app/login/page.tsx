import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);

    try {
      // В будущем подключить к реальному API
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      // const data = await response.json();

      // Симуляция входа
      setTimeout(() => {
        alert('Вход выполнен! (демо режим)');
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('Ошибка входа:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <i className="fas fa-sign-in-alt fa-3x text-primary mb-3"></i>
                <h2 className="mb-2">Вход в аккаунт</h2>
                <p className="text-muted">Войдите в свой аккаунт для доступа к порталу</p>
              </div>

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    required
                  />
                </div>

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="remember" />
                  <label className="form-check-label" htmlFor="remember">
                    Запомнить меня
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 mb-3"
                  disabled={!email || !password || isLoading}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
