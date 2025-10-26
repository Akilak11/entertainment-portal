import { Post as PostType } from '@/shared/types';

export class PostModel {
  static async findAll(limit: number = 20, offset: number = 0): Promise<PostType[]> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query(
    //   'SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2',
    //   [limit, offset]
    // );
    // return result.rows;

    // Временная заглушка
    return [
      {
        id: '1',
        userId: '1',
        content: 'Это тестовый пост для проверки функциональности!',
        mediaUrls: [],
        likesCount: 5,
        commentsCount: 2,
        repostsCount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        userId: '1',
        content: 'Привет всем! Добро пожаловать в наш развлекательный портал.',
        mediaUrls: ['https://example.com/image1.jpg'],
        likesCount: 10,
        commentsCount: 5,
        repostsCount: 3,
        createdAt: new Date(Date.now() - 3600000), // 1 час назад
        updatedAt: new Date(Date.now() - 3600000)
      }
    ];
  }

  static async findById(id: string): Promise<PostType | null> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query('SELECT * FROM posts WHERE id = $1', [id]);
    // return result.rows[0] || null;

    // Временная заглушка
    if (id === '1' || id === '2') {
      return {
        id,
        userId: '1',
        content: 'Это тестовый пост',
        mediaUrls: [],
        likesCount: 5,
        commentsCount: 2,
        repostsCount: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    return null;
  }

  static async findByUserId(userId: string, limit: number = 20): Promise<PostType[]> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query(
    //   'SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2',
    //   [userId, limit]
    // );
    // return result.rows;

    // Временная заглушка
    if (userId === '1') {
      return this.findAll(10);
    }
    return [];
  }

  static async create(postData: {
    userId: string;
    content: string;
    mediaUrls: string[];
  }): Promise<PostType> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query(
    //   'INSERT INTO posts (user_id, content, media_urls) VALUES ($1, $2, $3) RETURNING *',
    //   [postData.userId, postData.content, JSON.stringify(postData.mediaUrls)]
    // );
    // return result.rows[0];

    // Временная заглушка
    return {
      id: Date.now().toString(),
      userId: postData.userId,
      content: postData.content,
      mediaUrls: postData.mediaUrls,
      likesCount: 0,
      commentsCount: 0,
      repostsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static async update(id: string, content: string): Promise<PostType | null> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query(
    //   'UPDATE posts SET content = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    //   [content, id]
    // );
    // return result.rows[0] || null;

    // Временная заглушка
    const post = await this.findById(id);
    if (post) {
      return { ...post, content, updatedAt: new Date() };
    }
    return null;
  }

  static async delete(id: string): Promise<boolean> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query('DELETE FROM posts WHERE id = $1', [id]);
    // return result.rowCount > 0;

    // Временная заглушка
    return id === '1' || id === '2';
  }

  static async incrementLikes(id: string): Promise<void> {
    // TODO: Заменить на реальный запрос к БД
    // await query(
    //   'UPDATE posts SET likes_count = likes_count + 1 WHERE id = $1',
    //   [id]
    // );

    // Временная заглушка - просто логируем
    console.log(`Лайк добавлен к посту ${id}`);
  }

  static async decrementLikes(id: string): Promise<void> {
    // TODO: Заменить на реальный запрос к БД
    // await query(
    //   'UPDATE posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = $1',
    //   [id]
    // );

    // Временная заглушка
    console.log(`Лайк убран с поста ${id}`);
  }
}

