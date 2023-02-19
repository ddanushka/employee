import React, { useState, useEffect } from "react";
import { Employee } from "../employee";
import API from "../API";
import { Input, Modal, Form, Radio, FloatButton, List, Button } from "antd";
import DatePicker from "./DatePicker";
import AlertMessage from "./AlertMessage";
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";
import uuid from "react-uuid";

const { Item } = Form;
const { TextArea } = Input;

const EmployeeList: React.FC = () => {

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [formType, setFormType] = useState<"add" | "edit">("add");
  const [form] = Form.useForm();
  const [showMessage, setShowMessage] = useState<String | null>();

  const [date, setDate] = useState<moment.Moment | null>(moment(new Date()))
  // const handleDateChange = (dateObject: moment.Moment | null, dateString: string): void => {
  //   console.info('date string:', dateString)
  //   console.info('date obj:', dateObject)
  //   setDate(dateObject)
  // }
  const handleDateChange = (dateObject: moment.Moment | null, dateString: string): void => {
    setDate(dateObject)
    setFormData({ ...formData, joinedDate: dateString });
  }

  const fetchData = async () => {
    const employees = await API.getEmployees();
    setEmployees(employees);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    form.validateFields()
      .then(values => {
        if (formType === "add") {
          API.addEmployee({ ...values, joinedDate: date, id: uuid() });
        } else {
          API.updateEmployee({ ...formData, ...values, joinedDate: date });
        }
        form.resetFields();
        setVisible(false);
        setShowMessage("success");
        alert(showMessage)
        fetchData()
      })
      .catch(info => {
        setShowMessage("error");
        console.log('Validate Failed:', info);
      });
  };

  const handleDelete = async (id: string) => {
    await API.deleteEmployee(id);
    setShowMessage("warning");
    fetchData();
  };

  const handleEdit = (item:Employee) => {
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
      <FloatButton
        icon={<PlusOutlined />}
        type="primary"
        style={{
          right: 94,
        }}
        onClick={handleAdd}
      />
      <List
        className="employee-list"
        itemLayout="horizontal"
        dataSource={employees}
        renderItem={(item) => (
          <List.Item key={item.id} actions={[
            <Button type="text"
              onClick={()=>handleEdit(item)}
            >edit</Button>,
            <Button
              onClick={() => {
                handleDelete(item.id)
              }}
              type="text">delete</Button>
          ]}>
            <List.Item.Meta
              title={<div>{item.firstName + " " + item.lastName}</div>}
              description={
                <span className="employee-data">
                  <span className="gender">{item.gender}</span>
                  <span className="email">{item.email}</span>
                  <span className="phone">{item.phone}</span>
                  <span className="joined-date">{moment(item.joinedDate).format('YYYY/MM/DD')}</span>
                </span>
              }
            />
          </List.Item>
        )}
      />
      {renderForm()}
      {showMessage == "success" && (
        <AlertMessage
          type="success"
          content="Added employee successfully"
          onClose={()=>{setShowMessage(null)}}
        />
      )}
      {showMessage == "error" && (
        <AlertMessage
          type="error"
          content="An issue occured while submitting your request"
          onClose={()=>{setShowMessage(null)}}
        />
      )}
      {showMessage == "warning" && (
        <AlertMessage
          type="warning"
          content="Deleted the employee"
          onClose={()=>{setShowMessage(null)}}
        />
      )}
    </>
  )

};

export default EmployeeList;
