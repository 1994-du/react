// src/utils/navigation.ts
import { NavigateFunction } from 'react-router-dom';

// 定义一个变量来存储 navigate 函数
let navigate: NavigateFunction;

/**
 * 初始化导航函数
 * 通常在应用的根组件中调用一次
 */
export const setNavigate = (nav: NavigateFunction) => {
  navigate = nav;
};

/**
 * 导出具体的跳转方法，方便业务调用
 */
export const navigateToLogin = () => {
  if (navigate) {
    navigate('/login');
  } else {
    // 如果在初始化前就调用了（极少见），降级处理
    window.location.href = '/login';
  }
};

// 也可以导出通用的 navigate 方法，如果需要在拦截器中动态传参
export const getNavigate = () => navigate;
