import { Router } from 'express';

const router = Router();

// POST /api/translator/translate
router.post('/translate', (req, res) => {
  res.json({ message: 'Translate text' });
});

// GET /api/translator/languages
router.get('/languages', (req, res) => {
  res.json({ message: 'Get supported languages' });
});

// GET /api/translator/history
router.get('/history', (req, res) => {
  res.json({ message: 'Get translation history' });
});

export default router;
