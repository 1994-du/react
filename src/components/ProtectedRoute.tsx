import { Navigate, useLocation } from 'react-router-dom';
import { useLayoutEffect, useState, ReactNode } from 'react';
import cookie from 'js-cookie';
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    // 检查用户是否已登录
    const token = cookie.get('token')
    setIsAuthenticated(!!token);
  }, []);

  // 如果尚未检查身份验证状态，则可以显示加载状态
  if (isAuthenticated === null) {
    return <div>加载中...</div>;
  }

  // 如果用户未通过身份验证，重定向到登录页面
  return isAuthenticated ? children : <Navigate to={redirectTo} state={{ from: location }} replace />;
};

export default ProtectedRoute;