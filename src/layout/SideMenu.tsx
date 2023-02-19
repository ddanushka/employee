import React from 'react';
import { LogoutOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';


const { Sider } = Layout;
const SideMenu: React.FC = () => {
  const navigate = useNavigate()
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const items = [
    {
      label: (<Link to={'/'}>Home</Link>),
      key: 'home',
      icon: <UserOutlined />,
    },
    {
      label: (<Link to={'/user'}>User</Link>),
      key: 'user',
      icon: <BarChartOutlined />,
    },
    {
      label: (<Link to={'/chart'}>Chart</Link>),
      key: 'chart',
      icon: <LogoutOutlined />,
    },

  ];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div className="logo" />
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
