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

// Serve Next.js static export files
app.use(express.static(path.join(__dirname, '../client/out')));

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

// SPA fallback - serve static export files for all non-API routes
app.get('*', (req, res) => {
  // For static export, serve index.html for all routes
  const indexPath = path.join(__dirname, '../client/out/index.html');

  if (fs.existsSync(indexPath)) {
    console.log(`Serving static export index.html for route: ${req.path}`);
    return res.sendFile(indexPath);
  }

  // Check if it's a static file request (css, js, images, etc.)
  const staticFilePath = path.join(__dirname, '../client/out', req.path);
  if (fs.existsSync(staticFilePath) && fs.statSync(staticFilePath).isFile()) {
    return res.sendFile(staticFilePath);
  }

  // Fallback - return debug info
  console.log('Static export index.html not found at:', indexPath);
  console.log('Available files in out directory:');
  try {
    const outDir = path.join(__dirname, '../client/out');
    if (fs.existsSync(outDir)) {
      const files = fs.readdirSync(outDir, { recursive: true });
      console.log('Files:', files.slice(0, 10)); // Show first 10 files
    }
  } catch (err) {
    console.log('Error reading out directory:', err);
  }

  // Simple fallback HTML
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Развлекательный Портал - Static Export</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <div class="text-center">
                <h1 class="display-4 text-info">📦 Static Export Mode</h1>
                <p class="lead">Next.js static export не найден, но сервер работает</p>
                <div class="alert alert-warning mt-4">
                    <strong>Путь к index.html:</strong> <code>${indexPath}</code><br>
                    <strong>Найден файл:</strong> ${fs.existsSync(indexPath) ? '✅ Да' : '❌ Нет'}
                </div>
                <div class="mt-4">
                    <a href="/api/health" class="btn btn-success me-2">
                        <i class="fas fa-heartbeat me-2"></i>API Health Check
                    </a>
                    <a href="https://github.com/Akilak11/entertainment-portal" class="btn btn-secondary" target="_blank">
                        <i class="fab fa-github me-2"></i>GitHub Repo
                    </a>
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
