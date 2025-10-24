import { Router } from 'express';

const router = Router();

// GET /api/wiki/articles
router.get('/articles', (req, res) => {
  res.json({ message: 'Get wiki articles' });
});

// GET /api/wiki/articles/:id
router.get('/articles/:id', (req, res) => {
  res.json({ message: `Get article ${req.params.id}` });
});

// POST /api/wiki/articles
router.post('/articles', (req, res) => {
  res.json({ message: 'Create wiki article' });
});

// PUT /api/wiki/articles/:id
router.put('/articles/:id', (req, res) => {
  res.json({ message: `Update article ${req.params.id}` });
});

// GET /api/wiki/categories
router.get('/categories', (req, res) => {
  res.json({ message: 'Get wiki categories' });
});

// GET /api/wiki/search
router.get('/search', (req, res) => {
  res.json({ message: 'Search wiki articles' });
});

export default router;
