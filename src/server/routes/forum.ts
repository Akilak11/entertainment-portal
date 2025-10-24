import { Router } from 'express';
import {
  getForumsService,
  getForumById,
  createForumService,
  getTopicsByForum,
  getTopicById,
  createTopicService,
  incrementTopicViews
} from '../services/forumService';
import { ApiResponse } from '@/shared/types';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// GET /api/forum - список форумов
router.get('/', async (req, res) => {
  try {
    const forums = await getForumsService();
    const response: ApiResponse = {
      success: true,
      data: forums
    };

    res.json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка получения списка форумов'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// GET /api/forum/:id/topics
router.get('/:id/topics', async (req, res) => {
  try {
    const topics = await getTopicsByForum(req.params.id);
    const response: ApiResponse = {
      success: true,
      data: topics
    };

    res.json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка получения топиков форума'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// POST /api/forum/:id/topics
router.post('/:id/topics', async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.headers['user-id'] as string || '1'; // В будущем из JWT токена

    if (!title || !content) {
      throw new AppError('Заголовок и содержание топика обязательны', 400);
    }

    const topic = await createTopicService(req.params.id, userId, title, content);
    const response: ApiResponse = {
      success: true,
      data: topic,
      message: 'Топик создан успешно'
    };

    res.status(201).json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка создания топика'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// GET /api/forum/topics/:id
router.get('/topics/:id', async (req, res) => {
  try {
    // Увеличиваем счетчик просмотров
    await incrementTopicViews(req.params.id);

    const topic = await getTopicById(req.params.id);

    if (!topic) {
      throw new AppError('Топик не найден', 404);
    }

    const response: ApiResponse = {
      success: true,
      data: topic
    };

    res.json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка получения топика'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// POST /api/forum/topics/:id/messages
router.post('/topics/:id/messages', async (req, res) => {
  try {
    const { content } = req.body;
    const userId = req.headers['user-id'] as string || '1'; // В будущем из JWT токена

    if (!content) {
      throw new AppError('Содержание сообщения обязательно', 400);
    }

    // TODO: Реализовать добавление сообщений в топик
    const response: ApiResponse = {
      success: true,
      message: 'Сообщение добавлено в топик (пока заглушка)'
    };

    res.status(201).json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка добавления сообщения'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

export default router;
