import { useState,useEffect } from "react";
import "./App.scss";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { setNavigate } from "@/utils/navigation";
import { routerConfig } from "./routes";
import iconMap from "@/utils/iconMap";
import { Menu, Layout, Dropdown } from "antd";
import type { MenuProps,MenuTheme } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { routerItem,menuItem,IconMap } from '@/types/menu';
import { SvgIcon } from "@/components";
import { contentStyle,contentWrapStyle,headerStyle,layoutStyle,siderStyle } from "./styles/app.style";
const { Sider, Content, Header } = Layout;

const renderIcon = (iconName: string) => {
  const IconComponent = (iconMap as unknown as IconMap)[iconName];
  return IconComponent ? <IconComponent /> : null;
};
import { useSelector } from 'react-redux';

function App() {
interface RootState {
  user?: {
    userInfo?: {
      username?: string;
    };
  };
}
const userName: string = useSelector((state: RootState) => state.user?.userInfo?.username) || "用户名";
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
  useEffect(() => {
    setNavigate(navigate)
  },[navigate])
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
          icon: <SvgIcon name={item.meta.icon || ''}/>,
          children: recursionMenu(item.children),
        };
      }
      return {
        label: item.meta.title,
        key: item.path.replace('/*',''),
        icon: <SvgIcon name={item.meta.icon || ''}/>,
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
  const [themeVal, setThemeVal] = useState(document.documentElement.getAttribute('theme') as  MenuTheme )
  const switchTheme = () => {
    const newTheme = themeVal === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('theme',newTheme)
    setThemeVal(newTheme)
  }
  return (
    <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <SvgIcon name="react" color={themeVal} size="40px"/>
          <div style={{display:"flex",alignItems:'center',gap :"10px"}}>
            <SvgIcon name="theme" title="主题" size="20" onClick={switchTheme}/>
            <Dropdown menu={{  items: [{ key: "loginout", label: "退出登录" }], onClick: dropClick }} placement="bottom" arrow>
              <span style={{userSelect:'none'}}>{userName}</span>
            </Dropdown>
          </div>
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
            style={{ flex: 1,overflow:'auto' }}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={menuOpenChange}
            mode="inline"
            theme={themeVal}
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
