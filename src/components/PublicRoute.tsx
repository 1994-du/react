import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { RootState } from '@/store';

interface PublicRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

/**
 * 公共路由组件，用于处理无需登录即可访问的页面
 * 如果用户已登录，则重定向到其他页面
 */
const PublicRoute: React.FC<PublicRouteProps> = ({ 
  children, 
  redirectPath = '/home' 
}) => {
  const location = useLocation();
  
  // Get user info from Redux store
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  
  // Check if user is authenticated based on userInfo existence
  const isAuthenticated = !!userInfo;

  // 如果用户已通过身份验证，重定向到首页
  return !isAuthenticated ? children : <Navigate to={redirectPath} state={{ from: location }} replace />;
};

export default PublicRoute;