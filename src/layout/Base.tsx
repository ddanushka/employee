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
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
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
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
