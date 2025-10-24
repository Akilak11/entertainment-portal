export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="hero-section p-5 mb-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-3 fw-bold text-white mb-4">
              Добро пожаловать в
              <span className="text-warning"> Развлекательный Портал</span>
            </h1>
            <p className="lead text-white-50 mb-4">
              Всё в одном месте: социальная сеть, форум, магазин, переводчик и мини-вики.
              Присоединяйтесь к нашему сообществу!
            </p>
            <div className="d-flex gap-3">
              <a href="/register" className="btn btn-custom btn-lg">
                <i className="fas fa-rocket me-2"></i>Начать бесплатно
              </a>
              <a href="/login" className="btn btn-outline-light btn-lg">
                <i className="fas fa-sign-in-alt me-2"></i>Войти
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-center">
              <i className="fas fa-users fa-10x text-white-50 mb-4"></i>
              <h3 className="text-white">Присоединяйтесь к тысячам пользователей!</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row g-4 mb-5">
        <div className="col-12 text-center mb-5">
          <h2 className="display-4 fw-bold mb-3">Всё что вам нужно в одном месте</h2>
          <p className="lead text-muted">Откройте для себя все возможности нашего портала</p>
        </div>

        {/* Social Network */}
        <div className="col-lg-4 col-md-6">
          <div className="feature-card p-4 h-100">
            <div className="text-center mb-4">
              <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                <i className="fas fa-users fa-2x text-white"></i>
              </div>
              <h4 className="mb-3">Социальная сеть</h4>
              <p className="text-muted">Делитесь моментами, общайтесь с друзьями, создавайте сообщества и следите за жизнью других пользователей.</p>
              <a href="/social" className="btn btn-outline-primary">Перейти в соцсеть</a>
            </div>
          </div>
        </div>

        {/* Forum */}
        <div className="col-lg-4 col-md-6">
          <div className="feature-card p-4 h-100">
            <div className="text-center mb-4">
              <div className="bg-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                <i className="fas fa-comments fa-2x text-white"></i>
              </div>
              <h4 className="mb-3">Форум</h4>
              <p className="text-muted">Обсуждайте интересные темы, получайте помощь от сообщества, задавайте вопросы и делитесь знаниями.</p>
              <a href="/forum" className="btn btn-outline-success">Перейти в форум</a>
            </div>
          </div>
        </div>

        {/* Shop */}
        <div className="col-lg-4 col-md-6">
          <div className="feature-card p-4 h-100">
            <div className="text-center mb-4">
              <div className="bg-info rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                <i className="fas fa-shopping-cart fa-2x text-white"></i>
              </div>
              <h4 className="mb-3">Магазин</h4>
              <p className="text-muted">Покупайте товары и услуги, оставляйте отзывы, сравнивайте цены и находите лучшие предложения.</p>
              <a href="/shop" className="btn btn-outline-info">Перейти в магазин</a>
            </div>
          </div>
        </div>

        {/* Translator */}
        <div className="col-lg-6 col-md-6">
          <div className="feature-card p-4 h-100">
            <div className="text-center mb-4">
              <div className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                <i className="fas fa-language fa-2x text-white"></i>
              </div>
              <h4 className="mb-3">Переводчик</h4>
              <p className="text-muted">Переводите тексты на 100+ языков мгновенно. Поддержка профессиональных переводов и разговорного языка.</p>
              <a href="/translator" className="btn btn-outline-warning">Попробовать переводчик</a>
            </div>
          </div>
        </div>

        {/* Wiki */}
        <div className="col-lg-6 col-md-6">
          <div className="feature-card p-4 h-100">
            <div className="text-center mb-4">
              <div className="bg-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                <i className="fas fa-book fa-2x text-white"></i>
              </div>
              <h4 className="mb-3">Мини-Вики</h4>
              <p className="text-muted">Создавайте и редактируйте статьи, делитесь знаниями, изучайте новые темы и помогайте другим пользователям.</p>
              <a href="/wiki" className="btn btn-outline-danger">Перейти в вики</a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row text-center mb-5">
        <div className="col-md-3">
          <h2 className="display-4 fw-bold text-primary">1000+</h2>
          <p className="text-muted">Активных пользователей</p>
        </div>
        <div className="col-md-3">
          <h2 className="display-4 fw-bold text-success">5000+</h2>
          <p className="text-muted">Постов опубликовано</p>
        </div>
        <div className="col-md-3">
          <h2 className="display-4 fw-bold text-info">100+</h2>
          <p className="text-muted">Языков для перевода</p>
        </div>
        <div className="col-md-3">
          <h2 className="display-4 fw-bold text-warning">24/7</h2>
          <p className="text-muted">Поддержка пользователей</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <div className="hero-section p-5">
          <h2 className="display-5 fw-bold text-white mb-4">Готовы начать?</h2>
          <p className="lead text-white-50 mb-4">Присоединяйтесь к нашему сообществу прямо сейчас!</p>
          <a href="/register" className="btn btn-custom btn-lg me-3">
            <i className="fas fa-user-plus me-2"></i>Зарегистрироваться
          </a>
          <a href="/social" className="btn btn-outline-light btn-lg">
            <i className="fas fa-eye me-2"></i>Посмотреть демо
          </a>
        </div>
      </div>
    </>
  );
}
