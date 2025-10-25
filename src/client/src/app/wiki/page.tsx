'use client';

import { useState, useEffect } from 'react';

interface Article {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  viewsCount: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  parentId?: string;
}

export default function WikiPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleContent, setNewArticleContent] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // В будущем будет API
      // const articlesResponse = await fetch('http://localhost:3000/api/wiki/articles');
      // const categoriesResponse = await fetch('http://localhost:3000/api/wiki/categories');

      // Пока используем моковые данные
      const mockArticles: Article[] = [
        {
          id: '1',
          title: 'Добро пожаловать в вики',
          content: 'Это наша база знаний. Здесь вы можете найти полезную информацию и поделиться знаниями с другими пользователями.',
          categoryId: '1',
          userId: '1',
          viewsCount: 45,
          isPublished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Как использовать портал',
          content: 'Подробное руководство по использованию всех функций портала: социальная сеть, форум, магазин и переводчик.',
          categoryId: '1',
          userId: '1',
          viewsCount: 23,
          isPublished: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];

      const mockCategories: Category[] = [
        { id: '1', name: 'Общее', description: 'Общая информация о портале' },
        { id: '2', name: 'Техническое', description: 'Техническая документация' },
        { id: '3', name: 'Помощь', description: 'Руководства и FAQ' }
      ];

      setArticles(mockArticles);
      setCategories(mockCategories);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article => {
    const matchesCategory = !selectedCategory || article.categoryId === selectedCategory;
    const matchesSearch = !searchQuery ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch && article.isPublished;
  });

  const createArticle = async () => {
    if (!newArticleTitle.trim() || !newArticleContent.trim()) return;

    try {
      // В будущем будет API
      const newArticle: Article = {
        id: Date.now().toString(),
        title: newArticleTitle,
        content: newArticleContent,
        categoryId: selectedCategory || '1',
        userId: '1', // В будущем из JWT токена
        viewsCount: 0,
        isPublished: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setArticles(prev => [newArticle, ...prev]);
      setNewArticleTitle('');
      setNewArticleContent('');
      setShowCreateForm(false);
    } catch (error) {
      console.error('Ошибка создания статьи:', error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="mb-0">
              <i className="fas fa-book me-2 text-danger"></i>
              Мини-Вики
            </h1>
            <button
              className="btn btn-outline-primary"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              <i className="fas fa-plus me-2"></i>
              Создать статью
            </button>
          </div>

          {/* Поиск */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Поиск по статьям..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Все категории</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Создание статьи */}
          {showCreateForm && (
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Создать новую статью</h5>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Заголовок статьи"
                    value={newArticleTitle}
                    onChange={(e) => setNewArticleTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-select mb-3"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">Выберите категорию</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    rows={6}
                    placeholder="Содержание статьи..."
                    value={newArticleContent}
                    onChange={(e) => setNewArticleContent(e.target.value)}
                  />
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success"
                    onClick={createArticle}
                    disabled={!newArticleTitle.trim() || !newArticleContent.trim()}
                  >
                    <i className="fas fa-save me-2"></i>
                    Сохранить
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Отмена
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Список статей */}
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </div>
              <p className="mt-3">Загрузка статей...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">Статьи не найдены</h4>
              <p className="text-muted">Попробуйте изменить поисковый запрос или создайте новую статью.</p>
            </div>
          ) : (
            <div className="articles-list">
              {filteredArticles.map((article) => (
                <div key={article.id} className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">
                        <a href={`/wiki/articles/${article.id}`} className="text-decoration-none">
                          {article.title}
                        </a>
                      </h5>
                      <div className="text-end">
                        <div className="badge bg-primary me-2">
                          <i className="fas fa-eye me-1"></i>
                          {article.viewsCount}
                        </div>
                        <small className="text-muted">
                          {new Date(article.createdAt).toLocaleDateString('ru-RU')}
                        </small>
                      </div>
                    </div>

                    <p className="card-text text-muted">
                      {article.content.length > 200
                        ? `${article.content.substring(0, 200)}...`
                        : article.content}
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        Автор: Пользователь {article.userId}
                      </small>
                      <a href={`/wiki/articles/${article.id}`} className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-arrow-right me-1"></i>
                        Читать
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-lg-4">
          {/* Категории */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Категории</h5>
              <div className="list-group list-group-flush">
                <button
                  className={`list-group-item list-group-item-action text-start ${!selectedCategory ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('')}
                >
                  <i className="fas fa-list me-2"></i>
                  Все статьи ({articles.length})
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`list-group-item list-group-item-action text-start ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <i className="fas fa-folder me-2"></i>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Статистика */}
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Статистика</h5>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Всего статей:</span>
                  <strong>{articles.length}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Категорий:</span>
                  <strong>{categories.length}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Просмотров:</span>
                  <strong>{articles.reduce((sum, article) => sum + article.viewsCount, 0)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
