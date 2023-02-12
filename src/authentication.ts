import React, { useState } from "react";
import { Form, Input, Button } from "antd";

const { Item } = Form;

interface User {
  username: string;
  password: string;
  role: "standard" | "admin";
}

const users: User[] = [
  { username: "standard", password: "password", role: "standard" },
  { username: "admin", password: "password", role: "admin" }
];

const Authentication: React.FC = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState("");

  const handleSubmit = async (values: any) => {
    const user = users.find(
      u => u.username === values.username && u.password === values.password
    );

    if (!user) {
      setError("Incorrect username or password.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    window.location.replace("/");
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Username" />
      </Item>
      <Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input type="password" placeholder="Password" />
      </Item>
      <Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Item>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Form>
  );
};

export default Authentication;
