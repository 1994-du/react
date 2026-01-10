import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Home from "../pages/Home";
import FunComponents from "../pages/FunComponents";
import ClsComponents from "../pages/ClsComponents";
import Redux from "../pages/Redux";
import Login from "../pages/Login";
import Hooks from "../pages/Hooks";
import UseStateCom from "../pages/Hooks/useStateCom";
import UseEffectCom from "../pages/Hooks/useEffectCom";
import UseContextCom from "../pages/Hooks/useContextCom";
import UseMemoCom from "../pages/Hooks/useMemoCom";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";
import SystemManagement from "../pages/SystemManagement";
import UserManagement from "@/pages/SystemManagement/userManagement";
import RoleManagement from "@/pages/SystemManagement/roleManagement";
import Registry from "@/pages/Registry";
export const routerConfig = [
  {
    path: "/*",
    element: <App />,
    children: [
      {
        path: "home/*",
        meta: {
          title: "首页",
          showInMenu: true,
          icon: "shouye",
        },
        element: <ProtectedRoute><Home /></ProtectedRoute>,
        children: [
          {
            path: "FunComponent",
            meta: {
              title: "函数组件",
              showInMenu: true,
              icon: "function",
            },
            element: <FunComponents />,
          },
          {
            path: "ClsComponent",
            meta: {
              title: "类组件",
              showInMenu: true,
              icon: "class",
            },
            element: <ClsComponents />,
          },
        ],
      },
      {
        path: "redux",
        meta: {
          title: "Redux",
          showInMenu: true,
          icon: "redux",
        },
        element: <ProtectedRoute><Redux /></ProtectedRoute>,
      },
      {
        path: "hooks/*",
        meta: {
          title: "Hooks",
          showInMenu: true,
          icon: "wenjianjia",
        },
        element: <ProtectedRoute><Hooks /></ProtectedRoute>,
        children: [
          {
            path: "useState",
            meta: {
              title: "useState",
              showInMenu: true,
            },
            element: <UseStateCom />,
          },
          {
            path: "useEffect",
            meta: {
              title: "useEffect",
              showInMenu: true,
            },
            element: <UseEffectCom />,
          },
          {
            path: "useContext",
            meta: {
              title: "useContext",
              showInMenu: true,
            },
            element: <UseContextCom />,
          },
          {
            path: "useMemo",
            meta: {
              title: "useMemo",
              showInMenu: true,
            },
            element: <UseMemoCom />,
          },
        ],
      },
      {
        path: "system-management/*",
        meta:{
          title: "系统管理",
          showInMenu: true,
          icon: "shezhi_1",
        },
        element: <ProtectedRoute><SystemManagement /></ProtectedRoute>,
        children:[
          {
            path: "user-management",
            meta:{
              title: "用户管理",
              showInMenu: true,
              icon:"user"
            },
            element: <ProtectedRoute><UserManagement/></ProtectedRoute>
          },
          {
            path: "role-management",
            meta:{
              title: "角色管理",
              showInMenu: true,
              icon:"icon_roles"
            },
            element: <ProtectedRoute><RoleManagement/></ProtectedRoute>
          }
        ]
      }
    ],
  },
  {
    path: "/login",
    element: <PublicRoute><Login /></PublicRoute>,
  },
  {
    path: "/register",
    element: <PublicRoute><Registry /></PublicRoute>,
  },
];

const router = createBrowserRouter(routerConfig, {
  future: {
    v7_relativeSplatPath: true, // 启用新行为
  },
});

export default router;