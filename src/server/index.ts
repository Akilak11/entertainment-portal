import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';
import forumRoutes from './routes/forum';
import shopRoutes from './routes/shop';
import translatorRoutes from './routes/translator';
import wikiRoutes from './routes/wiki';

// Middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW || '15') * 60 * 1000),
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Слишком много запросов с вашего IP, попробуйте позже.'
});
app.use('/api', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Serve Next.js static files
app.use('/_next', express.static(path.join(__dirname, '../client/.next')));
app.use(express.static(path.join(__dirname, '../client/public')));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/translator', translatorRoutes);
app.use('/api/wiki', wikiRoutes);

// SPA fallback - serve Next.js app for all non-API routes
app.get('*', (req, res) => {
  // Try to serve index.html from different possible locations
  const possiblePaths = [
    path.join(__dirname, '../client/out/index.html'), // for static export
    path.join(__dirname, '../client/.next/server/app/index.html'), // for app directory
    path.join(__dirname, '../client/.next/server/pages/index.html'), // for pages directory
  ];

  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
  }

  // Fallback - return a simple HTML page
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Развлекательный Портал</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <div class="text-center">
                <h1 class="display-4 text-primary">🎉 Развлекательный Портал</h1>
                <p class="lead">Сервер работает! Клиентское приложение загружается...</p>
                <div class="mt-4">
                    <a href="/social" class="btn btn-primary me-2">Соцсеть</a>
                    <a href="/forum" class="btn btn-success me-2">Форум</a>
                    <a href="/shop" class="btn btn-info me-2">Магазин</a>
                    <a href="/api/health" class="btn btn-secondary">API Health Check</a>
                </div>
            </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint не найден' });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;
