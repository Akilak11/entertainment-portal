'use client';

import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images: string[];
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // В будущем будет API: /api/shop/products
      // Пока используем моковые данные
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Смартфон Samsung Galaxy S23',
          description: 'Флагманский смартфон с отличной камерой и производительностью',
          price: 899.99,
          categoryId: 'electronics',
          images: ['https://example.com/phone.jpg'],
          stock: 15,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Ноутбук Apple MacBook Pro',
          description: 'Мощный ноутбук для профессиональной работы',
          price: 2399.99,
          categoryId: 'electronics',
          images: ['https://example.com/laptop.jpg'],
          stock: 8,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Беспроводные наушники Sony',
          description: 'Качественные наушники с шумоподавлением',
          price: 299.99,
          categoryId: 'electronics',
          images: ['https://example.com/headphones.jpg'],
          stock: 25,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      setProducts(mockProducts);
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (product: Product) => {
    if (product.stock > 0) {
      setCart(prev => [...prev, product]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
          <p className="mt-3">Загрузка товаров...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">
              <i className="fas fa-shopping-cart me-2 text-info"></i>
              Магазин
            </h1>
            <button
              className="btn btn-outline-primary position-relative"
              onClick={() => setShowCart(!showCart)}
            >
              <i className="fas fa-shopping-bag me-2"></i>
              Корзина
              {cart.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              )}
            </button>
          </div>

          {/* Категории */}
          <div className="mb-4">
            <div className="btn-group" role="group">
              <input type="radio" className="btn-check" name="category" id="all" defaultChecked />
              <label className="btn btn-outline-primary" htmlFor="all">Все товары</label>

              <input type="radio" className="btn-check" name="category" id="electronics" />
              <label className="btn btn-outline-primary" htmlFor="electronics">Электроника</label>

              <input type="radio" className="btn-check" name="category" id="books" />
              <label className="btn btn-outline-primary" htmlFor="books">Книги</label>

              <input type="radio" className="btn-check" name="category" id="clothes" />
              <label className="btn btn-outline-primary" htmlFor="clothes">Одежда</label>
            </div>
          </div>

          {/* Список товаров */}
          <div className="row g-4">
            {products.length === 0 ? (
              <div className="col-12 text-center py-5">
                <i className="fas fa-box-open fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">Товаров пока нет</h4>
                <p className="text-muted">Скоро здесь появятся товары!</p>
              </div>
            ) : (
              products.map((product) => (
                <div key={product.id} className="col-lg-4 col-md-6">
                  <div className="card h-100">
                    {product.images.length > 0 && (
                      <img
                        src={product.images[0]}
                        className="card-img-top"
                        alt={product.name}
                        style={{height: '200px', objectFit: 'cover'}}
                      />
                    )}
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text text-muted flex-grow-1">
                        {product.description.length > 100
                          ? `${product.description.substring(0, 100)}...`
                          : product.description}
                      </p>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="h5 text-success mb-0">
                          ${product.price}
                        </span>
                        <span className={`badge ${product.stock > 0 ? 'bg-success' : 'bg-danger'}`}>
                          {product.stock > 0 ? `В наличии: ${product.stock}` : 'Нет в наличии'}
                        </span>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                      >
                        <i className="fas fa-shopping-cart me-2"></i>
                        Добавить в корзину
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Корзина */}
        {showCart && (
          <div className="col-lg-4">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-shopping-bag me-2"></i>
                  Корзина ({cart.length})
                </h5>
              </div>
              <div className="card-body">
                {cart.length === 0 ? (
                  <p className="text-muted text-center">Корзина пуста</p>
                ) : (
                  <>
                    <div className="cart-items mb-3">
                      {cart.map((item, index) => (
                        <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                          <div>
                            <h6 className="mb-0">{item.name}</h6>
                            <small className="text-muted">${item.price}</small>
                          </div>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-3">
                      <strong>Итого:</strong>
                      <strong>${getTotalPrice().toFixed(2)}</strong>
                    </div>
                    <button className="btn btn-success w-100">
                      <i className="fas fa-credit-card me-2"></i>
                      Оформить заказ
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
