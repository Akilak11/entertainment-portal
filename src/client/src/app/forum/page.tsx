import { useState } from 'react';

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  topicsCount: number;
  postsCount: number;
  lastPost?: {
    title: string;
    author: string;
    time: string;
  };
}

interface Topic {
  id: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  lastReply: string;
  isPinned: boolean;
}

export default function ForumPage() {
  const [categories] = useState<ForumCategory[]>([
    {
      id: '1',
      name: 'Общий',
      description: 'Общие обсуждения и вопросы',
      topicsCount: 25,
      postsCount: 156,
      lastPost: {
        title: 'Как добавить новый пост?',
        author: 'Пользователь',
        time: '2 часа назад'
      }
    },
    {
      id: '2',
      name: 'Техническая поддержка',
      description: 'Вопросы по использованию портала',
      topicsCount: 12,
      postsCount: 89,
      lastPost: {
        title: 'Ошибка при загрузке изображения',
        author: 'Администратор',
        time: '1 день назад'
      }
    },
    {
      id: '3',
      name: 'Развлечения',
      description: 'Фильмы, игры, музыка и хобби',
      topicsCount: 18,
      postsCount: 134,
      lastPost: {
        title: 'Лучшие игры 2024 года',
        author: 'Геймер',
        time: '3 часа назад'
      }
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [topics] = useState<Topic[]>([
    {
      id: '1',
      title: 'Добро пожаловать в форум!',
      author: 'Администратор',
      replies: 15,
      views: 234,
      lastReply: '2 часа назад',
      isPinned: true
    },
    {
      id: '2',
      title: 'Как создать новый пост?',
      author: 'Пользователь',
      replies: 8,
      views: 156,
      lastReply: '1 день назад',
      isPinned: false
    },
    {
      id: '3',
      title: 'Предложения по улучшению портала',
      author: 'Модератор',
      replies: 23,
      views: 445,
      lastReply: '3 часа назад',
      isPinned: false
    }
  ]);

  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');

  const handleCreateTopic = () => {
    if (newTopicTitle.trim() && newTopicContent.trim()) {
      // В будущем отправить на сервер
      alert('Топик создан! (демо режим)');
      setNewTopicTitle('');
      setNewTopicContent('');
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-comments me-2 text-primary"></i>
          Форум
        </h2>
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#createTopicModal"
        >
          <i className="fas fa-plus me-2"></i>
          Создать топик
        </button>
      </div>

      {!selectedCategory ? (
        // Список категорий
        <div className="row">
          {categories.map((category) => (
            <div key={category.id} className="col-md-4 mb-4">
              <div className="card h-100 feature-card">
                <div className="card-body">
                  <h5 className="card-title">
                    <a
                      href="#"
                      className="text-decoration-none"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </a>
                  </h5>
                  <p className="card-text text-muted">{category.description}</p>

                  <div className="row text-center mt-3">
                    <div className="col-6">
                      <small className="text-muted">Топиков</small>
                      <div className="fw-bold">{category.topicsCount}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Сообщений</small>
                      <div className="fw-bold">{category.postsCount}</div>
                    </div>
                  </div>

                  {category.lastPost && (
                    <div className="mt-3 pt-3 border-top">
                      <small className="text-muted">Последнее сообщение:</small>
                      <div className="small">
                        <a href="#" className="text-decoration-none">
                          {category.lastPost.title}
                        </a>
                      </div>
                      <small className="text-muted">
                        от {category.lastPost.author}, {category.lastPost.time}
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Топики категории
        <div>
          <div className="d-flex align-items-center mb-3">
            <button
              className="btn btn-outline-secondary me-3"
              onClick={() => setSelectedCategory(null)}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Назад к категориям
            </button>
            <h4>Топики категории</h4>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Тема</th>
                      <th>Автор</th>
                      <th>Ответы</th>
                      <th>Просмотры</th>
                      <th>Последний ответ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topics.map((topic) => (
                      <tr key={topic.id} className={topic.isPinned ? 'table-warning' : ''}>
                        <td>
                          <div className="d-flex align-items-center">
                            {topic.isPinned && <i className="fas fa-thumbtack text-warning me-2"></i>}
                            <a href={`/forum/topic/${topic.id}`} className="text-decoration-none">
                              {topic.title}
                            </a>
                          </div>
                        </td>
                        <td>{topic.author}</td>
                        <td>{topic.replies}</td>
                        <td>{topic.views}</td>
                        <td>
                          <small className="text-muted">{topic.lastReply}</small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно создания топика */}
      <div className="modal fade" id="createTopicModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Создать новый топик</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Заголовок</label>
                <input
                  type="text"
                  className="form-control"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="Введите заголовок топика"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Содержание</label>
                <textarea
                  className="form-control"
                  rows={5}
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                  placeholder="Опишите тему обсуждения"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Отмена
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreateTopic}
                disabled={!newTopicTitle.trim() || !newTopicContent.trim()}
              >
                Создать топик
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
