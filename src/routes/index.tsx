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
          icon: "MailOutlined",
        },
        element: <Home />,
        children: [
          {
            path: "FunComponent",
            meta: {
              title: "函数组件",
              showInMenu: true,
            },
            element: <FunComponents />,
          },
          {
            path: "ClsComponent",
            meta: {
              title: "类组件",
              showInMenu: true,
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
          icon: "MailOutlined",
        },
        element: <Redux />,
      },
      {
        path: "hooks/*",
        meta: {
          title: "Hooks",
          showInMenu: true,
          icon: "MailOutlined",
        },
        element: <Hooks />,
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];
const router = createBrowserRouter(routerConfig, {
  future: {
    v7_relativeSplatPath: true, // 启用新行为
  },
});

export default router;
