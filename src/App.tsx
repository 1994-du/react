import { useState,useEffect } from "react";
import cookie  from "js-cookie";
import "./App.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { routerConfig } from "./routes";
import iconMap from "@/utils/iconMap";
import { Menu, Layout, Dropdown } from "antd";
import type { MenuProps } from "antd";
import "@ant-design/v5-patch-for-react-19";
import logo from '@/assets/react.svg'
import { routerItem,menuItem,IconMap } from '@/types/menu';
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
  const IconComponent = (iconMap as unknown as IconMap)[iconName];
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
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>(()=>{
    return localStorage.getItem('openMenus')?.split(',')||[]
  });
  useEffect(() => {
    setSelectedKeys([location.pathname.split('/').reverse()[0]]);
  },[location.pathname])
  useEffect(() => {
    localStorage.setItem('openMenus',openKeys.join(','))
  },[openKeys])
  /**
   * @Description 展开菜单
   * @param collapsed
   */
  const [collapsed, setCollapsed] = useState(false);
  // 菜单递归
  const recursionMenu = (list:routerItem[]):  menuItem[] =>{
     return list.map((item:routerItem) => {
      if (item.children) {
        return {
          label: item.meta.title,
          key: item.path.replace('/*',''),
          icon: renderIcon(item.meta.icon || ''),
          children: recursionMenu(item.children),
        };
      }
      return {
        label: item.meta.title,
        key: item.path.replace('/*',''),
        icon: renderIcon(item.meta.icon || ''),
      }
     })
  }
  /**
   * @Description 菜单数据
   * @param menuData
   */
  const menuItems = recursionMenu(routerConfig.filter((item) => item.path === "/*")?.[0]?.children || []);

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
  
  const menuOpenChange = (openKeys:string[]) => {
    setOpenKeys(openKeys);
  };

  /**
   * 处理菜单项点击事件
   * 根据点击的菜单项构建路径并导航到相应路由，同时更新选中菜单项的高亮状态
   * @param {MenuProps["onClick"]} e - 菜单项点击事件对象，包含key和keyPath属性
   * @returns {void}
   */
  const menuClick: MenuProps["onClick"] = (e) => {
    let path=''
    e.keyPath.reverse().forEach((item) => {
      path +=  '/' + item;
    })
    navigate(path);
    setSelectedKeys([e.key]);
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
            style={{ flex: 1,overflow:'auto', backgroundColor: "transparent" }}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={menuOpenChange}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={menuItems}
          />
          <div className="menu_collapsed" onClick={toggleCollapsed}>
            {collapsed ? renderIcon('MenuUnfoldOutlined') : renderIcon('MenuFoldOutlined')}
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
