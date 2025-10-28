'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
      <div className="container">
        <a className="navbar-brand fw-bold fs-3" href="/">
          <i className="fas fa-star me-2 text-warning"></i>
          Развлекательный Портал
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link" href="/social">
                <i className="fas fa-users me-1"></i>Соцсеть
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/forum">
                <i className="fas fa-comments me-1"></i>Форум
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shop">
                <i className="fas fa-shopping-cart me-1"></i>Магазин
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/translator">
                <i className="fas fa-language me-1"></i>Переводчик
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/wiki">
                <i className="fas fa-book me-1"></i>Вики
              </a>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {isAuthenticated && user ? (
              <>
                <span className="text-white me-3">
                  <i className="fas fa-user me-1"></i>
                  Привет, {user.firstName || user.username}!
                </span>
                <div className="dropdown">
                  <button
                    className="btn btn-outline-light dropdown-toggle"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fas fa-user-circle me-1"></i>
                    Профиль
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="userDropdown">
                    <li><a className="dropdown-item" href="/profile">
                      <i className="fas fa-user me-2"></i>Мой профиль
                    </a></li>
                    <li><a className="dropdown-item" href="/settings">
                      <i className="fas fa-cog me-2"></i>Настройки
                    </a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={logout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Выйти
                    </button></li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <a href="/login" className="btn btn-outline-light me-2">
                  <i className="fas fa-sign-in-alt me-1"></i>Вход
                </a>
                <a href="/register" className="btn btn-warning">
                  <i className="fas fa-user-plus me-1"></i>Регистрация
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
