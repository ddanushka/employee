import React, { useState, useEffect, useContext } from "react";
import { Employee } from "../interfaces/employee";
import Employees from "../services/employees";
import { Input, Modal, Form, Radio, FloatButton, List, Button, message, Popconfirm } from "antd";
import DatePicker from "./DatePicker";
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";
import uuid from "react-uuid";
import { AuthContext } from "../context/AuthContext";

const { Item } = Form;

const EmployeeList: React.FC = () => {
  const { role } = useContext(AuthContext);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [form] = Form.useForm();

  const [date, setDate] = useState<moment.Moment | null>(moment(new Date()))
  const handleDateChange = (dateObject: moment.Moment | null, dateString: string): void => {
    setDate(dateObject)
    setFormData({ ...formData, joinedDate: dateString });
  }

  const fetchData = async () => {
    const employees = await Employees.getEmployees();
    setEmployees(employees);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    form.validateFields()
      .then(values => {
        if (formType === "add") {
          Employees.addEmployee({ ...values, joinedDate: date, id: uuid() });
        } else {
          Employees.updateEmployee({ ...formData, ...values, joinedDate: date });
        }
        form.resetFields();
        setVisible(false);
        message.success("Added employee successfully")
        fetchData()
      })
      .catch(info => {
        message.error("An issue occured while submitting your request")
      });
  };

  const handleDelete = async (id: string) => {
    await Employees.deleteEmployee(id);
    message.warning("Deleted the employee");
    fetchData();
  };

  const handleEdit = (item: Employee) => {
    form.resetFields();
    setFormData(item);
    setFormType("edit");
    setVisible(true);
  }

  const formClear = () => {
    setFormData({});
  }
  const handleAdd = () => {
    formClear();
    form.resetFields();
    setVisible(true)
    setFormType("add")
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const renderForm = () => (
    <Modal
      title={formType === "add" ? "Add Employee" : "Edit Employee"}
      open={visible}
      onOk={handleSubmit}
      onCancel={() => setVisible(false)}
      footer={null
      }
    >
      <Form
        form={form}
        {...formItemLayout}
        onFinish={handleSubmit}
        initialValues={{
          id: formData.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
        }}
      >
        <Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
            {
              min: 6,
              max: 10,
              message: 'First name should be between 6 and 10 characters'
            }
          ]}
        >
          <Input placeholder="First Name" />
        </Item>
        <Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
            {
              min: 6,
              max: 10,
              message: 'Last name should be between 6 and 10 characters'
            }
          ]}
        >
          <Input placeholder="Last Name" />
        </Item>
        <Item
          name="email"
          label="Email Address"
          rules={[
            {
              type: 'email',
              message: 'The input is not a valid email address!',
            },
            {
              required: true,
              message: 'Please input your email address!'
            }
          ]}
        >
          <Input placeholder="Email Address" />
        </Item>
        <Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!'
            },
            {
              pattern: new RegExp(
                "^[6|8|9][0-9]{7}$"
              ),
              message: "Phone number is invalid"
            }
          ]}
        >
          <Input placeholder="Phone Number" />
        </Item>
        <Item name="gender" label="Gender" rules={[{ required: true, message: 'Please select your gender!' }]}>
          <Radio.Group>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Item>
        <Item name="joinedDate" label="Joined Date">
          <DatePicker
            onChange={handleDateChange}
            value={date}
            disabledDate={(currentDate) => currentDate && currentDate > moment()}
          />
        </Item>
        <Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </Modal>
  );

  return (
    <>
      {role === "admin" &&
        <FloatButton
          icon={<PlusOutlined />}
          type="primary"
          style={{
            right: 94,
          }}
          onClick={handleAdd}
        />
      }
      <List
        className="employee-list"
        itemLayout="horizontal"
        dataSource={employees}
        renderItem={(item) => (
          <List.Item key={item.id} actions={ role === "admin" ? [
            <Button type="text"
              onClick={() => handleEdit(item)}
            >edit</Button>,
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => handleDelete(item.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text">delete</Button>
            </Popconfirm>
          ]: []}>
            <List.Item.Meta
              title={<div>{item.firstName + " " + item.lastName}</div>}
              description={
                <span className="employee-data">
                  <span className="gender">{item.gender}</span>
                  <span className="email">{item.email}</span>
                  <span className="phone">{item.phone}</span>
                  <span className="joined-date">{moment(item.joinedDate).format("MMMM Do YYYY")}</span>
                </span>
              }
            />
          </List.Item>
        )}
      />
      {renderForm()}
    </>
  )

};

export default EmployeeList;
