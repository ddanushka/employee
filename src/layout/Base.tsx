import React from 'react';
import { Layout, theme } from 'antd';
import SideMenu from './SideMenu';
import { Outlet } from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const BaseLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className='main-layout'>
      <SideMenu />
      <Layout>
        <Content
          style={{
            overflow: 'auto'
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
