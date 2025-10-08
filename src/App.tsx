import { useState } from "react";
import "./App.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { routerConfig } from "./routes";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import type { MenuProps } from "antd";
import "@ant-design/v5-patch-for-react-19";

const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  background: "white",
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

const renderIcon = (iconName: string) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent /> : null;
};

function App() {
  /**
   * @Description 菜单点击事件
   * @param event
   */
  const navigate = useNavigate();
  const menuClick: MenuProps["onClick"] = (e) => {
    navigate(e.key);
  };
  /**
   * @Description 菜单数据
   * @param menuData
   */
  console.log("routerConfig", routerConfig);

  const menuItems =
    routerConfig
      ?.filter((item) => item.path === "/*")?.[0]
      ?.children?.map((item) => ({
        label: item.meta?.title,
        key: `/${item.path.replace("/*", "")}`,
        icon: renderIcon(item.meta?.icon),
      })) || [];
  console.log("menuItems", menuItems);

  /**
   * @Description 展开菜单
   * @param collapsed
   */
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout style={layoutStyle}>
      <Layout>
        <Sider
          className="sider_custom"
          style={siderStyle}
          width={collapsed ? 80 : 200}
          collapsed={collapsed}
        >
          <Menu
            onClick={menuClick}
            style={{ flex: 1, backgroundColor: "transparent" }}
            defaultSelectedKeys={["/home"]}
            defaultOpenKeys={["/home"]}
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
      </Layout>
    </Layout>
  );
}

export default App;
