import React, { useState, useContext } from "react";
import { Form, Input, Button, Layout, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
import UserLogin from "../services/login";
import { User } from "../interfaces/user";
const { Content } = Layout;
const { Title } = Typography;

const Login: React.FC = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState<User>({
    password: '',
    username: ''
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    UserLogin.loginUser(formData)
    login();
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout className="login-page">
      <Space direction="horizontal" className="login-page__content">
        <Content>
          <Title>Login</Title>
          <Form onSubmitCapture={handleSubmit} className="login-form">
            <Form.Item>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Item>
            <Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>

        </Content>
      </Space>
    </Layout>
  );
};

export default Login;
