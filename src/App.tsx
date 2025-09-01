import { useState } from 'react'
import './App.scss'
import { Outlet, useNavigate } from 'react-router-dom';
import { routerConfig } from './routes';
import { AppstoreOutlined, MailOutlined, SettingOutlined,MenuFoldOutlined,MenuUnfoldOutlined, } from '@ant-design/icons';
import { Menu,Layout,Button } from 'antd';
import type { MenuProps } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import menuData from '@/utils/menus.json';

const { Header, Sider, Content, Footer } = Layout;
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  // background: 'linear-gradient(to right, #BA1E35, #CB4C78)',
  // background:'#BA1E35'
  background:'gray'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#F3CDD5',
  // background: 'radial-gradient(circle, #ff0000ff 30%, #59ff00ff 60%, rgba(4, 0, 255, 1))',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  // backgroundColor: '#DBB08C',
   background:'gray'
  // background: 'radial-gradient(circle, #464646ff 50%, #252525ff)'
};

const footerStyle: React.CSSProperties = {
  height: 70,
  flexShrink: 0,
  textAlign: 'center',
  color: '#fff',
  // background: 'linear-gradient(to right, #fff, #000)',
  // background: 'linear-gradient(to right, #BA1E35, #CB4C78)',
   background:'gray',
  zIndex: 1
};

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
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
  console.log('routerConfig',routerConfig);
  
  /**
     * @Description 菜单点击事件
     * @param event
    */
  const navigate = useNavigate();
  const menuClick: MenuProps['onClick'] = (e)=>{
    navigate(e.key);
  }
  /**
   * @Description 菜单数据
   * @param menuData
  */
  const menuItems = menuData.map(menu=>({
    label:menu.label,
    key:menu.key,
    icon:renderIcon(menu.icon),
    // children:menu.children?.map(sec=>({
    //   label:sec.label,
    //   key:sec.key,
    //   icon:renderIcon(sec.icon),
    // }))
  }))
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
      <Header style={headerStyle}>
        <div onClick={() => {
          navigate('/login');
        }}>登录</div>
      </Header>
      <Layout>
        <Sider className='sider_custom' style={siderStyle} width={collapsed ? 80 : 200} collapsed={collapsed}>
          <Menu
            onClick={menuClick}
            style={{flex: 1, backgroundColor: 'transparent' }}
            defaultSelectedKeys={['/home']}
            defaultOpenKeys={['/home']}
            mode="inline"
            theme='dark'
            inlineCollapsed={collapsed}
            items={menuItems}
          />
          <div className='menu_collapsed' onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </Sider>
        <Content style={contentStyle}>
          <Outlet/>
        </Content>
      </Layout>
      <Footer style={footerStyle}>
        {/* <iframe src="https://ant.design/components/input-cn"></iframe> */}
      </Footer>
    </Layout>
  )
}

export default App
