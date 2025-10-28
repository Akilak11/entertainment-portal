'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('🚫 User not authenticated, redirecting to login');
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Показываем загрузку пока проверяем аутентификацию
  if (isLoading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Проверка аутентификации...</span>
              </div>
              <p className="mt-2">Проверка аутентификации...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Если не аутентифицирован, ничего не показываем (редирект произойдет в useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // Если аутентифицирован, показываем защищенный контент
  return <>{children}</>;
}
