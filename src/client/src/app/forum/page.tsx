import { useState, useEffect } from 'react';

interface Forum {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface Topic {
  id: string;
  forumId: string;
  userId: string;
  title: string;
  content: string;
  viewsCount: number;
  messagesCount: number;
  isPinned: boolean;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ForumPage() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [selectedForum, setSelectedForum] = useState<string>('');
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicContent, setNewTopicContent] = useState('');

  useEffect(() => {
    loadForums();
  }, []);

  useEffect(() => {
    if (selectedForum) {
      loadTopics(selectedForum);
    }
  }, [selectedForum]);

  const loadForums = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/forum');
      const data = await response.json();

      if (data.success) {
        setForums(data.data);
        if (data.data.length > 0) {
          setSelectedForum(data.data[0].id);
        }
      }
    } catch (error) {
      console.error('Ошибка загрузки форумов:', error);
    }
  };

  const loadTopics = async (forumId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/forum/${forumId}/topics`);
      const data = await response.json();

      if (data.success) {
        setTopics(data.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки топиков:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTopic = async () => {
    if (!newTopicTitle.trim() || !newTopicContent.trim() || !selectedForum) return;

    try {
      const response = await fetch(`http://localhost:3000/api/forum/${selectedForum}/topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTopicTitle,
          content: newTopicContent
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewTopicTitle('');
        setNewTopicContent('');
        loadTopics(selectedForum);
      }
    } catch (error) {
      console.error('Ошибка создания топика:', error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mb-4">
            <i className="fas fa-comments me-2 text-success"></i>
            Форум
          </h1>

          {/* Выбор форума */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Выберите раздел форума</h5>
              <div className="row">
                {forums.map((forum) => (
                  <div key={forum.id} className="col-md-4 mb-3">
                    <button
                      className={`btn w-100 ${selectedForum === forum.id ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setSelectedForum(forum.id)}
                    >
                      {forum.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Создание топика */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Создать новый топик</h5>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Заголовок топика"
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="Содержание топика"
                  value={newTopicContent}
                  onChange={(e) => setNewTopicContent(e.target.value)}
                />
              </div>
              <button
                className="btn btn-success"
                onClick={createTopic}
                disabled={!newTopicTitle.trim() || !newTopicContent.trim()}
              >
                <i className="fas fa-plus me-2"></i>
                Создать топик
              </button>
            </div>
          </div>

          {/* Список топиков */}
          <div className="topics-list">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Загрузка...</span>
                </div>
                <p className="mt-3">Загрузка топиков...</p>
              </div>
            ) : topics.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">Топиков пока нет</h4>
                <p className="text-muted">Создайте первый топик в этом разделе!</p>
              </div>
            ) : (
              topics.map((topic) => (
                <div key={topic.id} className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-1">
                          {topic.isPinned && <i className="fas fa-thumbtack text-warning me-2"></i>}
                          <a href={`/forum/topics/${topic.id}`} className="text-decoration-none">
                            {topic.title}
                          </a>
                        </h5>
                        <p className="card-text text-muted small">
                          Автор: Пользователь {topic.userId} •
                          Создано: {new Date(topic.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <div className="text-end">
                        <div className="badge bg-primary me-2">
                          <i className="fas fa-eye me-1"></i>
                          {topic.viewsCount}
                        </div>
                        <div className="badge bg-success">
                          <i className="fas fa-comments me-1"></i>
                          {topic.messagesCount}
                        </div>
                      </div>
                    </div>

                    <p className="card-text mb-3">
                      {topic.content.length > 200
                        ? `${topic.content.substring(0, 200)}...`
                        : topic.content}
                    </p>

                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        Последнее обновление: {new Date(topic.updatedAt).toLocaleDateString('ru-RU')}
                      </small>
                      <a href={`/forum/topics/${topic.id}`} className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-arrow-right me-1"></i>
                        Читать
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Статистика форума</h5>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Форумов:</span>
                  <strong>{forums.length}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Топиков:</span>
                  <strong>{topics.length}</strong>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Сообщений:</span>
                  <strong>{topics.reduce((sum, topic) => sum + topic.messagesCount, 0)}</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Правила форума</h5>
              <ul className="list-unstyled small">
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Будьте вежливы и уважайте других участников
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Не размещайте спам или рекламу
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Используйте понятные заголовки для топиков
                </li>
                <li className="mb-2">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  Проверяйте, не обсуждалась ли тема ранее
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
