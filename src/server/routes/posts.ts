import { Router } from 'express';
import {
  getPostsService,
  getPostById,
  createPostService,
  updatePostService,
  deletePostService,
  likePostService,
  unlikePostService
} from '../services/postService';
import {
  getCommentsByPostId,
  createCommentService,
  likeCommentService
} from '../services/commentService';
import { ApiResponse } from '@/shared/types';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// GET /api/posts - лента постов
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = parseInt(req.query.offset as string) || 0;

    const posts = await getPostsService(limit, offset);
    const response: ApiResponse = {
      success: true,
      data: posts
    };

    res.json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка получения постов'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// POST /api/posts - создать пост
router.post('/', async (req, res) => {
  try {
    const { content, mediaUrls } = req.body;
    const userId = req.headers['user-id'] as string || '1'; // В будущем из JWT токена

    if (!content) {
      throw new AppError('Содержание поста обязательно', 400);
    }

    const post = await createPostService(userId, content, mediaUrls || []);
    const response: ApiResponse = {
      success: true,
      data: post,
      message: 'Пост создан успешно'
    };

    res.status(201).json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка создания поста'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const post = await getPostById(req.params.id);

    if (!post) {
      throw new AppError('Пост не найден', 404);
    }

    const response: ApiResponse = {
      success: true,
      data: post
    };

    res.json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка получения поста'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// PUT /api/posts/:id
router.put('/:id', async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      throw new AppError('Содержание поста обязательно', 400);
    }

    const post = await updatePostService(req.params.id, content);

    if (!post) {
      throw new AppError('Пост не найден', 404);
    }

    const response: ApiResponse = {
      success: true,
      data: post,
      message: 'Пост обновлен успешно'
    };

    res.json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка обновления поста'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const success = await deletePostService(req.params.id);

    if (!success) {
      throw new AppError('Пост не найден', 404);
    }

    const response: ApiResponse = {
      success: true,
      message: 'Пост удален успешно'
    };

    res.json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка удаления поста'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// POST /api/posts/:id/like
router.post('/:id/like', async (req, res) => {
  try {
    await likePostService(req.params.id);

    const response: ApiResponse = {
      success: true,
      message: 'Лайк добавлен'
    };

    res.json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка добавления лайка'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// POST /api/posts/:id/unlike
router.post('/:id/unlike', async (req, res) => {
  try {
    await unlikePostService(req.params.id);

    const response: ApiResponse = {
      success: true,
      message: 'Лайк убран'
    };

    res.json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка удаления лайка'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// GET /api/posts/:id/comments
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await getCommentsByPostId(req.params.id);

    const response: ApiResponse = {
      success: true,
      data: comments
    };

    res.json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка получения комментариев'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

// POST /api/posts/:id/comments
router.post('/:id/comments', async (req, res) => {
  try {
    const { content, parentId } = req.body;
    const userId = req.headers['user-id'] as string || '1'; // В будущем из JWT токена

    if (!content) {
      throw new AppError('Содержание комментария обязательно', 400);
    }

    const comment = await createCommentService(userId, req.params.id, content, parentId);
    const response: ApiResponse = {
      success: true,
      data: comment,
      message: 'Комментарий добавлен успешно'
    };

    res.status(201).json(response);
  } catch (error) {
    const appError = error as AppError;
    const response: ApiResponse = {
      success: false,
      error: appError.message || 'Ошибка добавления комментария'
    };
    res.status(appError.statusCode || 500).json(response);
  }
});

export default router;
