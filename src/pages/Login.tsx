import React, { useState } from 'react';
import { Form, Input, Button, Layout, Typography, Space } from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // handle form submission and authentication
  };

  return (
    <div className="login-page">
      <Layout>
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
        <Content>
            <Title>Login</Title>
            <Form onFinish={handleSubmit}>
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input value={username} onChange={e => setUsername(e.target.value)} />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>

        </Content>
          </Space>
      </Layout>
    </div>
  );
};

export default Login;
