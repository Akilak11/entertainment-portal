import { Comment as CommentType } from '@/shared/types';

export class CommentModel {
  static async findByPostId(postId: string, limit: number = 20): Promise<CommentType[]> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query(
    //   'SELECT * FROM comments WHERE post_id = $1 ORDER BY created_at ASC LIMIT $2',
    //   [postId, limit]
    // );
    // return result.rows;

    // Временная заглушка
    return [
      {
        id: '1',
        userId: '1',
        postId,
        content: 'Отличный пост!',
        likesCount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        userId: '1',
        postId,
        content: 'Согласен с вами!',
        likesCount: 1,
        createdAt: new Date(Date.now() - 1800000), // 30 минут назад
        updatedAt: new Date(Date.now() - 1800000)
      }
    ];
  }

  static async create(commentData: {
    userId: string;
    postId: string;
    content: string;
    parentId?: string;
  }): Promise<CommentType> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query(
    //   'INSERT INTO comments (user_id, post_id, content, parent_id) VALUES ($1, $2, $3, $4) RETURNING *',
    //   [commentData.userId, commentData.postId, commentData.content, commentData.parentId]
    // );
    // return result.rows[0];

    // Временная заглушка
    return {
      id: Date.now().toString(),
      userId: commentData.userId,
      postId: commentData.postId,
      parentId: commentData.parentId,
      content: commentData.content,
      likesCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static async incrementLikes(id: string): Promise<void> {
    // TODO: Заменить на реальный запрос к БД
    // await query(
    //   'UPDATE comments SET likes_count = likes_count + 1 WHERE id = $1',
    //   [id]
    // );

    // Временная заглушка
    console.log(`Лайк добавлен к комментарию ${id}`);
  }
}

