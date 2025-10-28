'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    bio: user?.bio || ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isAuthenticated || !user) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="alert alert-warning text-center">
              <i className="fas fa-exclamation-triangle fa-3x mb-3"></i>
              <h4>Доступ запрещен</h4>
              <p>Для просмотра профиля необходимо войти в систему.</p>
              <a href="/login" className="btn btn-primary">Войти</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        bio: formData.bio
      });

      setMessage({ type: 'success', text: 'Профиль успешно обновлен!' });
      setIsEditing(false);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Ошибка обновления профиля' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      username: user.username,
      bio: user.bio || ''
    });
    setIsEditing(false);
    setMessage(null);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">
                  <i className="fas fa-user-circle me-2"></i>
                  Профиль пользователя
                </h2>
                <button
                  className="btn btn-outline-light"
                  onClick={logout}
                >
                  <i className="fas fa-sign-out-alt me-1"></i>
                  Выйти
                </button>
              </div>
            </div>

            <div className="card-body">
              {message && (
                <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                  <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
                  {message.text}
                </div>
              )}

              {/* Аватар и основная информация */}
              <div className="row mb-4">
                <div className="col-md-4 text-center">
                  <div className="mb-3">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt="Аватар"
                        className="rounded-circle"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div
                        className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto"
                        style={{ width: '120px', height: '120px' }}
                      >
                        <i className="fas fa-user fa-3x text-white"></i>
                      </div>
                    )}
                  </div>
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="fas fa-camera me-1"></i>
                    Изменить фото
                  </button>
                </div>

                <div className="col-md-8">
                  <div className="mb-3">
                    <h4>{user.firstName} {user.lastName}</h4>
                    <p className="text-muted mb-1">@{user.username}</p>
                    <p className="mb-2">
                      <span className={`badge ${user.isVerified ? 'bg-success' : 'bg-secondary'}`}>
                        {user.isVerified ? 'Подтвержден' : 'Не подтвержден'}
                      </span>
                      <span className="badge bg-info ms-1">
                        {user.role === 'admin' ? 'Администратор' : user.role === 'moderator' ? 'Модератор' : 'Пользователь'}
                      </span>
                    </p>
                  </div>

                  <div className="row text-center">
                    <div className="col-4">
                      <div className="border rounded p-2">
                        <div className="h5 mb-0">0</div>
                        <small className="text-muted">Постов</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="border rounded p-2">
                        <div className="h5 mb-0">0</div>
                        <small className="text-muted">Друзей</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="border rounded p-2">
                        <div className="h5 mb-0">0</div>
                        <small className="text-muted">Лайков</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Форма редактирования */}
              <div className="border-top pt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Личная информация</h5>
                  {!isEditing ? (
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <i className="fas fa-edit me-1"></i>
                      Редактировать
                    </button>
                  ) : (
                    <div>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={handleSave}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                            Сохранение...
                          </>
                        ) : (
                          <>
                            <i className="fas fa-save me-1"></i>
                            Сохранить
                          </>
                        )}
                      </button>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        <i className="fas fa-times me-1"></i>
                        Отмена
                      </button>
                    </div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Имя</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={formData.firstName}
                        onChange={handleInputChange('firstName')}
                        placeholder="Введите имя"
                      />
                    ) : (
                      <p className="form-control-plaintext">{user.firstName || 'Не указано'}</p>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Фамилия</label>
                    {isEditing ? (
                      <input
                        type="text"
                        className="form-control"
                        value={formData.lastName}
                        onChange={handleInputChange('lastName')}
                        placeholder="Введите фамилию"
                      />
                    ) : (
                      <p className="form-control-plaintext">{user.lastName || 'Не указано'}</p>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Имя пользователя</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={formData.username}
                      onChange={handleInputChange('username')}
                      placeholder="Введите имя пользователя"
                    />
                  ) : (
                    <p className="form-control-plaintext">@{user.username}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <p className="form-control-plaintext">{user.email}</p>
                </div>

                <div className="mb-3">
                  <label className="form-label">О себе</label>
                  {isEditing ? (
                    <textarea
                      className="form-control"
                      rows={3}
                      value={formData.bio}
                      onChange={handleInputChange('bio')}
                      placeholder="Расскажите о себе..."
                    />
                  ) : (
                    <p className="form-control-plaintext">{user.bio || 'Информация не указана'}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Дата регистрации</label>
                  <p className="form-control-plaintext">
                    {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
