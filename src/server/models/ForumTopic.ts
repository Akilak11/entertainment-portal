import { ForumTopic as ForumTopicType } from '@/shared/types';

export class ForumTopicModel {
  static async getTopicsByForum(forumId: string, limit: number = 20): Promise<ForumTopicType[]> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query(
    //   'SELECT * FROM forum_topics WHERE forum_id = $1 ORDER BY created_at DESC LIMIT $2',
    //   [forumId, limit]
    // );
    // return result.rows;

    // Временная заглушка
    if (forumId === '1') {
      return [
        {
          id: '1',
          forumId,
          userId: '1',
          title: 'Добро пожаловать в форум!',
          content: 'Это первый топик в нашем форуме. Добро пожаловать всех!',
          viewsCount: 25,
          messagesCount: 5,
          isPinned: true,
          isLocked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          forumId,
          userId: '1',
          title: 'Как добавить новый пост?',
          content: 'Расскажите, пожалуйста, как можно добавить новый пост на портал?',
          viewsCount: 12,
          messagesCount: 3,
          isPinned: false,
          isLocked: false,
          createdAt: new Date(Date.now() - 3600000),
          updatedAt: new Date(Date.now() - 3600000)
        }
      ];
    }
    return [];
  }

  static async getTopicById(id: string): Promise<ForumTopicType | null> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query('SELECT * FROM forum_topics WHERE id = $1', [id]);
    // return result.rows[0] || null;

    // Временная заглушка
    return {
      id,
      forumId: '1',
      userId: '1',
      title: 'Тестовый топик',
      content: 'Содержание тестового топика',
      viewsCount: 10,
      messagesCount: 2,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static async createTopic(topicData: {
    forumId: string;
    userId: string;
    title: string;
    content: string;
  }): Promise<ForumTopicType> {
    // TODO: Заменить на реальный запрос к БД
    // const result = await query(
    //   'INSERT INTO forum_topics (forum_id, user_id, title, content) VALUES ($1, $2, $3, $4) RETURNING *',
    //   [topicData.forumId, topicData.userId, topicData.title, topicData.content]
    // );
    // return result.rows[0];

    // Временная заглушка
    return {
      id: Date.now().toString(),
      forumId: topicData.forumId,
      userId: topicData.userId,
      title: topicData.title,
      content: topicData.content,
      viewsCount: 0,
      messagesCount: 1,
      isPinned: false,
      isLocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }

  static async incrementViews(id: string): Promise<void> {
    // TODO: Заменить на реальный запрос к БД
    // await query(
    //   'UPDATE forum_topics SET views_count = views_count + 1 WHERE id = $1',
    //   [id]
    // );

    // Временная заглушка
    console.log(`Просмотр добавлен к топику ${id}`);
  }
}
