import { useState } from 'react';

interface Post {
  id: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export default function SocialPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      content: 'Привет всем! Это мой первый пост в социальной сети нашего портала! 🚀',
      author: 'Администратор',
      likes: 5,
      comments: 2,
      createdAt: new Date().toLocaleString('ru-RU')
    },
    {
      id: '2',
      content: 'Обсуждаем новую функциональность портала. Что бы вы хотели видеть?',
      author: 'Модератор',
      likes: 12,
      comments: 8,
      createdAt: new Date(Date.now() - 3600000).toLocaleString('ru-RU')
    }
  ]);

  const [newPost, setNewPost] = useState('');

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        content: newPost,
        author: 'Вы',
        likes: 0,
        comments: 0,
        createdAt: new Date().toLocaleString('ru-RU')
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="container py-4">
      {/* Создание поста */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Создать новый пост</h5>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows={3}
              placeholder="Что у вас нового?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={handleCreatePost}
            disabled={!newPost.trim()}
          >
            Опубликовать
          </button>
        </div>
      </div>

      {/* Лента постов */}
      <div className="row">
        <div className="col-md-8">
          <h3 className="mb-4">Лента постов</h3>

          {posts.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">Постов пока нет</h5>
              <p className="text-muted">Создайте первый пост, чтобы начать общение!</p>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white me-3" style={{width: '40px', height: '40px'}}>
                      <i className="fas fa-user"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">{post.author}</h6>
                      <small className="text-muted">{post.createdAt}</small>
                    </div>
                  </div>

                  <p className="card-text">{post.content}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group" role="group">
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-heart me-1"></i>
                        {post.likes}
                      </button>
                      <button className="btn btn-outline-secondary btn-sm">
                        <i className="fas fa-comment me-1"></i>
                        {post.comments}
                      </button>
                      <button className="btn btn-outline-info btn-sm">
                        <i className="fas fa-share me-1"></i>
                        Поделиться
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Правая панель */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Активные пользователи</h5>
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex align-items-center">
                  <div className="bg-success rounded-circle me-2" style={{width: '10px', height: '10px'}}></div>
                  Администратор
                </div>
                <div className="list-group-item d-flex align-items-center">
                  <div className="bg-warning rounded-circle me-2" style={{width: '10px', height: '10px'}}></div>
                  Модератор
                </div>
                <div className="list-group-item d-flex align-items-center">
                  <div className="bg-info rounded-circle me-2" style={{width: '10px', height: '10px'}}></div>
                  Пользователь 1
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Популярные темы</h5>
              <div className="list-group list-group-flush">
                <a href="/forum" className="list-group-item list-group-item-action">
                  <i className="fas fa-comments me-2"></i>
                  Обсуждение нового функционала
                </a>
                <a href="/forum" className="list-group-item list-group-item-action">
                  <i className="fas fa-question-circle me-2"></i>
                  Вопросы и ответы
                </a>
                <a href="/forum" className="list-group-item list-group-item-action">
                  <i className="fas fa-lightbulb me-2"></i>
                  Идеи и предложения
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
