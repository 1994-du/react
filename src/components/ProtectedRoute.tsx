import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { RootState } from '@/store';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

/**
 * 受保护的路由组件，用于实现路由守卫功能
 * 如果用户未登录，则重定向到登录页面
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/login' 
}) => {
  const location = useLocation();
  
  // Get user info from Redux store
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  
  // Check if user is authenticated based on userInfo existence
  const isAuthenticated = !!userInfo;

  // 如果用户未通过身份验证，重定向到登录页面
  return isAuthenticated ? children : <Navigate to={redirectTo} state={{ from: location }} replace />;
};

export default ProtectedRoute;