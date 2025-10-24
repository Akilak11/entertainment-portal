import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Развлекательный Портал',
  description: 'Социальная сеть, форум, магазин, переводчик и вики в одном месте',
  keywords: ['социальная сеть', 'форум', 'магазин', 'переводчик', 'вики', 'развлечения'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation */}
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">
                    Развлекательный Портал
                  </h1>
                </div>
                <div className="flex items-center space-x-4">
                  <a href="/login" className="text-gray-600 hover:text-gray-900">
                    Вход
                  </a>
                  <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Регистрация
                  </a>
                </div>
              </div>
            </div>
          </nav>

          {/* Main content */}
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t mt-auto">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 text-sm">
                © 2024 Развлекательный Портал. Все права защищены.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
