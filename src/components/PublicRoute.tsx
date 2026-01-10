import { Navigate, useLocation } from 'react-router-dom';
import { useLayoutEffect, useState, ReactNode } from 'react';
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    // 检查用户是否已登录
    const token = sessionStorage.getItem('isLogin')
    setIsAuthenticated(!!token);
  }, []);

  // 如果尚未检查身份验证状态，则可以显示加载状态
  if (isAuthenticated === null) {
    return <div>加载中...</div>;
  }

  // 如果用户已通过身份验证，重定向到首页
  return !isAuthenticated ? children : <Navigate to={redirectPath} state={{ from: location }} replace />;
};

export default PublicRoute;