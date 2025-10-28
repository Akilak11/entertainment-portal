import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { UserModel } from '../models/User';

const router = Router();

// GET /api/users/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

// PUT /api/users/:id
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const targetUserId = req.params.id;

    // Пользователь может обновлять только свой профиль
    if (userId !== targetUserId) {
      return res.status(403).json({ error: 'Недостаточно прав для выполнения операции' });
    }

    const updatedUser = await UserModel.updateProfile(userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json({
      success: true,
      data: updatedUser,
      message: 'Профиль успешно обновлен'
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// PUT /api/users/profile - обновление профиля текущего пользователя
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).user.userId;

    const updatedUser = await UserModel.updateProfile(userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json({
      success: true,
      data: updatedUser,
      message: 'Профиль успешно обновлен'
    });

  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// GET /api/users/:id/posts
router.get('/:id/posts', (req, res) => {
  res.json({ message: `Get posts for user ${req.params.id}` });
});

// GET /api/users/:id/followers
router.get('/:id/followers', (req, res) => {
  res.json({ message: `Get followers for user ${req.params.id}` });
});

// POST /api/users/:id/follow
router.post('/:id/follow', (req, res) => {
  res.json({ message: `Follow user ${req.params.id}` });
});

// POST /api/users/:id/unfollow
router.post('/:id/unfollow', (req, res) => {
  res.json({ message: `Unfollow user ${req.params.id}` });
});

export default router;
