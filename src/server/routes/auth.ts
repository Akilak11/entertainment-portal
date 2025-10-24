import { Router } from 'express';
import { login, register, refresh, logout } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middleware/validation';

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
router.get('/me', (req, res) => {
  // TODO: Implement get current user
  res.json({ message: 'Get current user endpoint' });
});

export default router;
