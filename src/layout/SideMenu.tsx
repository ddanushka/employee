import React from 'react';
import { LogoutOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import UserLogin from '../services/login';

const { Sider } = Layout;

const SideMenu: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    UserLogin.logoutUser()
    navigate('login')
    window.location.reload()
  }

  const items = [
    {
      label: (<Link to={'/'}>Home</Link>),
      key: 'home',
      icon: <UserOutlined />,

    },
    {
      label: (<Link to={'/chart'}>Chart</Link>),
      key: 'chart',
      icon: <BarChartOutlined />,
    },
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: () => { logout() }
    },

  ];

  return (
    <Sider
      className='side-bar'
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['4']}
        items={items}
      />
    </Sider>
  );
};

export default SideMenu;
