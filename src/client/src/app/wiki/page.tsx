import { useState } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  views: number;
  rating: number;
  createdAt: string;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  articlesCount: number;
  color: string;
}

export default function WikiPage() {
  const [categories] = useState<Category[]>([
    {
      id: '1',
      name: 'Технологии',
      description: 'Статьи о программировании, IT и технологиях',
      articlesCount: 25,
      color: 'primary'
    },
    {
      id: '2',
      name: 'Наука',
      description: 'Научные открытия и исследования',
      articlesCount: 18,
      color: 'success'
    },
    {
      id: '3',
      name: 'История',
      description: 'Исторические события и биографии',
      articlesCount: 32,
      color: 'warning'
    },
    {
      id: '4',
      name: 'Культура',
      description: 'Искусство, литература и культурные явления',
      articlesCount: 15,
      color: 'info'
    }
  ]);

  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'Введение в React',
      content: 'React - это JavaScript библиотека для создания пользовательских интерфейсов...',
      category: 'Технологии',
      author: 'Разработчик',
      views: 1250,
      rating: 4.8,
      createdAt: new Date().toLocaleDateString('ru-RU'),
      tags: ['React', 'JavaScript', 'Frontend']
    },
    {
      id: '2',
      title: 'История интернета',
      content: 'Интернет начал развиваться в 1960-х годах...',
      category: 'История',
      author: 'Историк',
      views: 890,
      rating: 4.6,
      createdAt: new Date(Date.now() - 86400000).toLocaleDateString('ru-RU'),
      tags: ['Интернет', 'История', 'Технологии']
    },
    {
      id: '3',
      title: 'Теория относительности',
      content: 'Специальная теория относительности была опубликована Альбертом Эйнштейном в 1905 году...',
      category: 'Наука',
      author: 'Физик',
      views: 2100,
      rating: 4.9,
      createdAt: new Date(Date.now() - 172800000).toLocaleDateString('ru-RU'),
      tags: ['Физика', 'Наука', 'Эйнштейн']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category === selectedCategory)
    : articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-book me-2 text-primary"></i>
          Мини-Вики
        </h2>
        <button className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>
          Создать статью
        </button>
      </div>

      {/* Поиск */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Поиск статей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-outline-secondary">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>

      {!selectedCategory ? (
        // Список категорий
        <div className="row">
          {categories.map((category) => (
            <div key={category.id} className="col-md-6 mb-4">
              <div className="card h-100 feature-card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className={`bg-${category.color} rounded-circle d-flex align-items-center justify-content-center text-white me-3`} style={{width: '50px', height: '50px'}}>
                      <i className="fas fa-folder"></i>
                    </div>
                    <div>
                      <h5 className="mb-1">{category.name}</h5>
                      <small className="text-muted">{category.articlesCount} статей</small>
                    </div>
                  </div>
                  <p className="card-text text-muted">{category.description}</p>
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    Просмотреть статьи
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Статьи категории
        <div>
          <div className="d-flex align-items-center mb-3">
            <button
              className="btn btn-outline-secondary me-3"
              onClick={() => setSelectedCategory(null)}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Назад к категориям
            </button>
            <h4>Статьи категории "{selectedCategory}"</h4>
          </div>

          <div className="row">
            {filteredArticles.map((article) => (
              <div key={article.id} className="col-md-6 mb-4">
                <div className="card h-100 feature-card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title">
                        <a href={`/wiki/article/${article.id}`} className="text-decoration-none">
                          {article.title}
                        </a>
                      </h5>
                      <span className="badge bg-primary">{article.category}</span>
                    </div>

                    <p className="card-text text-muted">
                      {article.content.length > 150
                        ? `${article.content.substring(0, 150)}...`
                        : article.content
                      }
                    </p>

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="text-muted">
                        <i className="fas fa-user me-1"></i>
                        {article.author}
                      </small>
                      <small className="text-muted">
                        <i className="fas fa-eye me-1"></i>
                        {article.views}
                      </small>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-warning">
                        {'★'.repeat(Math.floor(article.rating))}
                        <small className="text-muted ms-1">({article.rating})</small>
                      </div>
                      <div>
                        {article.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="badge bg-secondary me-1">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
