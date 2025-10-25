import { useState, useEffect } from 'react';

interface Post {
  id: string;
  userId: string;
  content: string;
  mediaUrls: string[];
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  createdAt: string;
  updatedAt: string;
}

export default function SocialPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts');
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки постов:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!newPostContent.trim()) return;

    try {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newPostContent,
          mediaUrls: []
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewPostContent('');
        loadPosts(); // Перезагрузка постов
      }
    } catch (error) {
      console.error('Ошибка создания поста:', error);
    }
  };

  const likePost = async (postId: string) => {
    try {
      await fetch(`http://localhost:3000/api/posts/${postId}/like`, {
        method: 'POST',
      });
      loadPosts(); // Перезагрузка постов
    } catch (error) {
      console.error('Ошибка лайка:', error);
    }
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
          <p className="mt-3">Загрузка постов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <h1 className="mb-4">
            <i className="fas fa-users me-2 text-primary"></i>
            Социальная сеть
          </h1>

          {/* Создание поста */}
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Создать новый пост</h5>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Что у вас нового?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary"
                onClick={createPost}
                disabled={!newPostContent.trim()}
              >
                <i className="fas fa-paper-plane me-2"></i>
                Опубликовать
              </button>
            </div>
          </div>

          {/* Лента постов */}
          <div className="posts-list">
            {posts.length === 0 ? (
              <div className="text-center py-5">
                <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h4 className="text-muted">Постов пока нет</h4>
                <p className="text-muted">Создайте первый пост!</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post.id} className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                        <i className="fas fa-user text-white"></i>
                      </div>
                      <div>
                        <h6 className="mb-0">Пользователь {post.userId}</h6>
                        <small className="text-muted">
                          {new Date(post.createdAt).toLocaleDateString('ru-RU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </small>
                      </div>
                    </div>

                    <p className="card-text mb-3">{post.content}</p>

                    {post.mediaUrls.length > 0 && (
                      <div className="mb-3">
                        {post.mediaUrls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            className="img-fluid rounded"
                            alt="Пост"
                            style={{maxHeight: '300px'}}
                          />
                        ))}
                      </div>
                    )}

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex gap-3">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => likePost(post.id)}
                        >
                          <i className="fas fa-heart me-1"></i>
                          {post.likesCount}
                        </button>
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="fas fa-comment me-1"></i>
                          {post.commentsCount}
                        </button>
                        <button className="btn btn-outline-secondary btn-sm">
                          <i className="fas fa-share me-1"></i>
                          {post.repostsCount}
                        </button>
                      </div>
                      <button className="btn btn-link btn-sm text-muted">
                        <i className="fas fa-ellipsis-h"></i>
                      </button>
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
              <h5 className="card-title">Популярные темы</h5>
              <div className="list-group list-group-flush">
                <a href="/forum" className="list-group-item list-group-item-action">
                  <i className="fas fa-comments me-2"></i>
                  Обсуждения в форуме
                </a>
                <a href="/social" className="list-group-item list-group-item-action">
                  <i className="fas fa-fire me-2"></i>
                  Горячие посты
                </a>
                <a href="/wiki" className="list-group-item list-group-item-action">
                  <i className="fas fa-book me-2"></i>
                  Полезные статьи
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
