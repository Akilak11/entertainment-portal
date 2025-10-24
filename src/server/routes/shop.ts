import { Router } from 'express';

const router = Router();

// GET /api/shop/products
router.get('/products', (req, res) => {
  res.json({ message: 'Get products catalog' });
});

// GET /api/shop/products/:id
router.get('/products/:id', (req, res) => {
  res.json({ message: `Get product ${req.params.id}` });
});

// GET /api/shop/categories
router.get('/categories', (req, res) => {
  res.json({ message: 'Get product categories' });
});

// POST /api/shop/cart
router.post('/cart', (req, res) => {
  res.json({ message: 'Add to cart' });
});

// GET /api/shop/cart
router.get('/cart', (req, res) => {
  res.json({ message: 'Get cart contents' });
});

// POST /api/shop/orders
router.post('/orders', (req, res) => {
  res.json({ message: 'Create order' });
});

export default router;
