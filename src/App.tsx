import { useState } from 'react'
import './App.scss'
import { Outlet, useNavigate } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Redux from './pages/Redux';

import { AppstoreOutlined, MailOutlined, SettingOutlined,MenuFoldOutlined,MenuUnfoldOutlined, } from '@ant-design/icons';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import menuData from '@/utils/menus.json';
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
    <>
    <div className='app_wrap'>
      {/* <header></header> */}
      <div className='app_content'>
        <aside className={collapsed ? 'aside_collapsed':'aside_normal'}>
          <Menu
            onClick={menuClick}
            style={{width:'max-content', backgroundColor: '#fff' }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            inlineCollapsed={collapsed}
            items={menuItems}
          />
          <div className='menu_collapsed' onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </aside>
        <main>
          {/* <Routes>
            <Route path="home/*" element={<Home/>} />
            <Route path='/redux' element={<Redux/>}/>
            <Route path="/login" element={<Login/>} />
          </Routes> */}
          <Outlet/>
        </main>
      </div>
      {/* <footer></footer> */}
    </div>
    </>
  )
}

export default App
