import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Развлекательный Портал - Всё в одном месте!',
  description: 'Социальная сеть, форум, магазин, переводчик и вики в одном месте. Присоединяйтесь к нашему сообществу!',
  keywords: ['социальная сеть', 'форум', 'магазин', 'переводчик', 'вики', 'развлечения', 'общение'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
        <style>{`
          .bg-gradient-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
          }
          .hero-section {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .feature-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          }
          .btn-custom {
            background: linear-gradient(45deg, #667eea, #764ba2);
            border: none;
            border-radius: 25px;
            padding: 12px 30px;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          .btn-custom:hover {
            background: linear-gradient(45deg, #764ba2, #667eea);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <div className="bg-gradient-primary">
          {/* Navigation */}
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

                <div className="d-flex">
                  <a href="/login" className="btn btn-outline-light me-2">
                    <i className="fas fa-sign-in-alt me-1"></i>Вход
                  </a>
                  <a href="/register" className="btn btn-warning">
                    <i className="fas fa-user-plus me-1"></i>Регистрация
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Main content */}
          <main className="container py-5">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-dark text-light mt-auto">
            <div className="container py-4">
              <div className="row">
                <div className="col-md-6">
                  <h5 className="text-warning">
                    <i className="fas fa-star me-2"></i>
                    Развлекательный Портал
                  </h5>
                  <p className="text-muted">Всё в одном месте: общение, покупки, знания и развлечения!</p>
                </div>
                <div className="col-md-3">
                  <h6 className="text-warning">Разделы</h6>
                  <ul className="list-unstyled">
                    <li><a href="/social" className="text-muted text-decoration-none">Соцсеть</a></li>
                    <li><a href="/forum" className="text-muted text-decoration-none">Форум</a></li>
                    <li><a href="/shop" className="text-muted text-decoration-none">Магазин</a></li>
                  </ul>
                </div>
                <div className="col-md-3">
                  <h6 className="text-warning">Инструменты</h6>
                  <ul className="list-unstyled">
                    <li><a href="/translator" className="text-muted text-decoration-none">Переводчик</a></li>
                    <li><a href="/wiki" className="text-muted text-decoration-none">Вики</a></li>
                    <li><a href="/help" className="text-muted text-decoration-none">Помощь</a></li>
                  </ul>
                </div>
              </div>
              <hr className="my-4" />
              <div className="row align-items-center">
                <div className="col-md-6">
                  <p className="mb-0 text-muted">© 2024 Развлекательный Портал. Все права защищены.</p>
                </div>
                <div className="col-md-6 text-md-end">
                  <a href="#" className="text-muted me-3"><i className="fab fa-vk fa-lg"></i></a>
                  <a href="#" className="text-muted me-3"><i className="fab fa-telegram fa-lg"></i></a>
                  <a href="#" className="text-muted me-3"><i className="fab fa-discord fa-lg"></i></a>
                  <a href="#" className="text-muted"><i className="fab fa-github fa-lg"></i></a>
                </div>
              </div>
            </div>
          </footer>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
