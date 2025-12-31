import { useState } from "react";
import cookie  from "js-cookie";
import "./App.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { routerConfig } from "./routes";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Menu, Layout, Dropdown } from "antd";
import type { MenuProps } from "antd";
import "@ant-design/v5-patch-for-react-19";
import logo from '@/assets/react.svg'
const { Sider, Content, Header } = Layout;

const contentStyle: React.CSSProperties = {
  flex : 1,
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  background: "white",
};
const contentWrapStyle:  React.CSSProperties = {
  width : "100%",
  display: "flex",
  flexDirection: "row",
  flex: 1,
};
const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  background: "black",
};

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
};
const iconMap: { [key: string]: React.FC } = {
  AppstoreOutlined: AppstoreOutlined,
  MailOutlined: MailOutlined,
  SettingOutlined: SettingOutlined,
  MenuFoldOutlined: MenuFoldOutlined,
  MenuUnfoldOutlined: MenuUnfoldOutlined,
};
const headerStyle:React.CSSProperties=  {
  display:"flex",
  justifyContent:"space-between",
  alignItems:'center',
  backgroundColor: "black",
  color: "white",
  fontSize: "16px",
  fontWeight: "bold",
  padding: "0 15px",
};

const renderIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent /> : null;
};
const userName:string = sessionStorage.getItem ("username") || "用户名";
function App() {
  /**
   * @Description 菜单点击事件
   * @param event
   */
  const navigate = useNavigate();
  const location = useLocation();
  const menuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };
  /**
   * @Description 菜单数据
   * @param menuData
   */
  const menuItems =
    routerConfig
      ?.filter((item) => item.path === "/*")?.[0]
      ?.children?.map((item) => ({
        label: item.meta?.title,
        key: `/${item.path.replace("/*", "")}`,
        icon: renderIcon(item.meta?.icon),
      })) || [];

  // 根据当前路由计算选中的菜单项
  const getSelectedKeys = () => {
    // 获取当前路由路径
    const currentPath = location.pathname;
    // 检查当前路径是否直接匹配菜单项
    const matchedItem = menuItems.find(item => currentPath === item.key);
    if (matchedItem) {
      return [matchedItem.key];
    }
    // 检查当前路径是否包含菜单项的key作为前缀
    const parentItem = menuItems.find(item => currentPath.startsWith(item.key + '/'));
    if (parentItem) {
      return [parentItem.key];
    }
    // 默认返回首页
    return ['/home'];
  };

  // 根据当前路由计算展开的菜单项
  const getOpenKeys = () => {
    const selectedKeys = getSelectedKeys();
    return selectedKeys;
  };

  /**
   * @Description 展开菜单
   * @param collapsed
   */
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const dropClick:MenuProps[ "onClick"] =  (e) => {
    if(e.key==='loginout'){
      sessionStorage.clear()
      cookie.remove('token')
      navigate('/login');
    }
  };
  return (
    <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <img src={logo} alt="" />
          <Dropdown menu={{  items: [{ key: "loginout", label: "退出登录" }], onClick: dropClick }} placement="bottom" arrow>
            {userName}
          </Dropdown>
        </Header>
        <Content style={contentWrapStyle}>
          <Sider
          className="sider_custom"
          style={siderStyle}
          width={collapsed ? 80 : 200}
          collapsed={collapsed}
        >
          <Menu
            onClick={menuClick}
            style={{ flex: 1, backgroundColor: "transparent" }}
            selectedKeys={getSelectedKeys()}
            openKeys={getOpenKeys()}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={menuItems}
          />
          <div className="menu_collapsed" onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          </Sider>
          <Content style={contentStyle}>
            <Outlet />
          </Content>
        </Content>
    </Layout>
  );
}

export default App;
