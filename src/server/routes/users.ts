import { Router } from 'express';

const router = Router();

// GET /api/users/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

// PUT /api/users/:id
router.put('/:id', (req, res) => {
  res.json({ message: `Update user ${req.params.id}` });
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
