import { Router } from 'express';
import { login, register, refresh, logout } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middleware/validation';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// POST /api/auth/login
router.post('/login', validateLogin, login);

// POST /api/auth/register
router.post('/register', validateRegister, register);

// POST /api/auth/refresh
router.post('/refresh', refresh);

// POST /api/auth/logout
router.post('/logout', logout);

// GET /api/auth/me - получить текущего пользователя
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await UserModel.findById((req as any).user.userId);
    if (!user) {
      return res.status(404).json({ error: 'Пользователь не найден' });
    }

    res.json({ data: user });
  } catch (error) {
    console.error('Error getting current user:', error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

export default router;
