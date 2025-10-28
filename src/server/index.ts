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

// Utils
import { initDatabase } from './utils/initDatabase';

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

// Serve Next.js static export files from multiple possible locations
const staticPaths = [
  path.join(__dirname, '../client/out'),
  path.join(__dirname, '../../client/out'),
  path.join(process.cwd(), 'src/client/out'),
  path.join(process.cwd(), 'client/out'),
  '/opt/render/project/src/client/out',
];

staticPaths.forEach(staticPath => {
  if (fs.existsSync(staticPath)) {
    console.log(`Serving static files from: ${staticPath}`);
    app.use(express.static(staticPath));
  }
});

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
  // Possible locations for Next.js static export
  const possiblePaths = [
    path.join(__dirname, '../client/out/index.html'),        // Standard location
    path.join(__dirname, '../../client/out/index.html'),     // If dist is deeper
    path.join(process.cwd(), 'src/client/out/index.html'),   // From project root
    path.join(process.cwd(), 'client/out/index.html'),       // Alternative
    '/opt/render/project/src/client/out/index.html',         // Absolute path for Render
  ];

  console.log('Looking for Next.js static files...');
  console.log('__dirname:', __dirname);
  console.log('process.cwd():', process.cwd());
  console.log('req.path:', req.path);

  // Try to find index.html in possible locations
  for (const indexPath of possiblePaths) {
    console.log(`Checking: ${indexPath}`);
    if (fs.existsSync(indexPath)) {
      console.log(`✅ Found index.html at: ${indexPath}`);
      return res.sendFile(indexPath);
    }
  }

  // Check for static files (_next, etc.)
  const staticFilePaths = [
    path.join(__dirname, '../client/out', req.path),
    path.join(__dirname, '../../client/out', req.path),
    path.join(process.cwd(), 'src/client/out', req.path),
    path.join(process.cwd(), 'client/out', req.path),
    path.join('/opt/render/project/src/client/out', req.path),
  ];

  for (const staticPath of staticFilePaths) {
    if (fs.existsSync(staticPath) && fs.statSync(staticPath).isFile()) {
      console.log(`Serving static file: ${staticPath}`);
      return res.sendFile(staticPath);
    }
  }

  // Debug info - list all directories we can find
  console.log('Directory scan:');
  const dirsToCheck = [
    path.join(__dirname, '../client'),
    path.join(__dirname, '../../client'),
    path.join(process.cwd(), 'src/client'),
    path.join(process.cwd(), 'client'),
    '/opt/render/project/src/client',
  ];

  dirsToCheck.forEach(dir => {
    console.log(`${dir}: ${fs.existsSync(dir) ? 'EXISTS' : 'NOT FOUND'}`);
    if (fs.existsSync(dir)) {
      try {
        const contents = fs.readdirSync(dir);
        console.log(`  Contents: ${contents.join(', ')}`);
      } catch (err) {
        console.log(`  Error reading: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
  });

  // Fallback HTML with detailed debug info
  const debugInfo = possiblePaths.map(p => `<li><code>${p}</code> - ${fs.existsSync(p) ? '✅ Найден' : '❌ Не найден'}</li>`).join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Развлекательный Портал - Debug</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body>
        <div class="container mt-5">
            <div class="text-center">
                <h1 class="display-4 text-warning">🔍 Debug Mode</h1>
                <p class="lead">Ищем файлы Next.js static export...</p>
                <div class="alert alert-info mt-4">
                    <h5>Проверенные пути к index.html:</h5>
                    <ul class="text-start">
                        ${debugInfo}
                    </ul>
                    <hr>
                    <strong>__dirname:</strong> <code>${__dirname}</code><br>
                    <strong>process.cwd():</strong> <code>${process.cwd()}</code><br>
                    <strong>req.path:</strong> <code>${req.path}</code>
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

// Инициализация базы данных и запуск сервера
const startServer = async () => {
  try {
    await initDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Сервер запущен на порту ${PORT}`);
      console.log(`📊 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Ошибка запуска сервера:', error);
    process.exit(1);
  }
};

startServer();

export default app;
