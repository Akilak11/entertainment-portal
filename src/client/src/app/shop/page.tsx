import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

export default function ShopPage() {
  const [products] = useState<Product[]>([
    {
      id: '1',
      name: 'Премиум аккаунт',
      description: 'Полный доступ ко всем функциям портала',
      price: 299,
      image: 'https://via.placeholder.com/300x200/007bff/ffffff?text=Premium',
      category: 'Подписки',
      rating: 4.8,
      reviews: 156
    },
    {
      id: '2',
      name: 'Цифровой товар',
      description: 'Электронная книга или курс',
      price: 99,
      image: 'https://via.placeholder.com/300x200/28a745/ffffff?text=E-book',
      category: 'Цифровой контент',
      rating: 4.5,
      reviews: 89
    },
    {
      id: '3',
      name: 'Физический товар',
      description: 'Товар для доставки',
      price: 599,
      image: 'https://via.placeholder.com/300x200/dc3545/ffffff?text=Physical',
      category: 'Физические товары',
      rating: 4.2,
      reviews: 67
    }
  ]);

  const [cart, setCart] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Подписки', 'Цифровой контент', 'Физические товары'];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">
              <i className="fas fa-shopping-cart me-2 text-primary"></i>
              Магазин
            </h2>
            <div className="btn-group" role="group">
              {categories.map(category => (
                <button
                  key={category}
                  className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Все товары' : category}
                </button>
              ))}
            </div>
          </div>

          <div className="row">
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 mb-4">
                <div className="card h-100 feature-card">
                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{height: '200px', objectFit: 'cover'}}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-muted">{product.description}</p>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="h5 text-primary mb-0">{product.price}₽</span>
                      <div className="text-warning">
                        {'★'.repeat(Math.floor(product.rating))}
                        <small className="text-muted">({product.reviews})</small>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary w-100"
                      onClick={() => addToCart(product)}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      В корзину
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Корзина */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">
                <i className="fas fa-shopping-basket me-2"></i>
                Корзина ({cart.length})
              </h5>
            </div>
            <div className="card-body">
              {cart.length === 0 ? (
                <p className="text-muted text-center">Корзина пуста</p>
              ) : (
                <>
                  {cart.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <h6 className="mb-0">{item.name}</h6>
                        <small className="text-muted">{item.price}₽</small>
                      </div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => setCart(cart.filter((_, i) => i !== index))}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>Итого: {getTotalPrice()}₽</strong>
                    <button className="btn btn-success">
                      <i className="fas fa-credit-card me-2"></i>
                      Оформить заказ
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Популярные категории</h5>
              <div className="list-group list-group-flush">
                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  Подписки
                  <span className="badge bg-primary rounded-pill">12</span>
                </a>
                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  Цифровой контент
                  <span className="badge bg-primary rounded-pill">8</span>
                </a>
                <a href="#" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  Физические товары
                  <span className="badge bg-primary rounded-pill">15</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
