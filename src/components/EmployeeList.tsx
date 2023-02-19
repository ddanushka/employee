import React, { useState, useEffect } from "react";
import { Employee } from "../employee";
import API from "../API";
import { Input, Modal, Form, Radio, FloatButton, List, Button } from "antd";
import DatePicker from "./DatePicker";
import { PlusOutlined } from '@ant-design/icons';
import moment from "moment";
import uuid from "react-uuid";

const { TextArea } = Input;

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<Partial<Employee>>({});
  const [formType, setFormType] = useState<"add" | "edit">("add");

  const [date, setDate] = useState<moment.Moment | null>(moment(new Date()))
  const handleDateChange = (dateObject: moment.Moment | null, dateString: string): void => {
    console.info('date string:', dateString)
    console.info('date obj:', dateObject)
    setDate(dateObject)
  }

  const fetchData = async () => {
    const employees = await API.getEmployees();
    setEmployees(employees);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (formType === "add") {
      await API.addEmployee(formData as Employee);
    } else {
      await API.updateEmployee(formData as Employee);
    }
    setVisible(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await API.deleteEmployee(id);
    fetchData();
  };
  const renderForm = () => (
    <Modal
      title={formType === "add" ? "Add Employee" : "Edit Employee"}
      open={visible}
      onOk={handleSubmit}
      onCancel={() => setVisible(false)}
    >
      <Form>
        <Form.Item label="First Name">
          <Input
            value={formData.firstName || ""}
            onChange={e =>
              setFormData({ ...formData, firstName: e.target.value ,id: uuid() })
            }
          />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input
            value={formData.lastName || ""}
            onChange={e =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            value={formData.email || ""}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Phone">
          <Input
            value={formData.phone || ""}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
          />
        </Form.Item>
        <Form.Item label="Gender">
          <Radio.Group
            value={formData.gender || "Male"}
            onChange={e =>
              setFormData({ ...formData, gender: e.target.value })
            }
          >
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Joined Date">
          <DatePicker
            onChange={(date, dateString) =>
              setFormData({ ...formData, joinedDate: dateString })
            }
            disabledDate={current => current && current > moment().endOf("day")}
          />
        </Form.Item>
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
        onClick={() =>{
          setFormData({});
          setVisible(true)
          setFormType("add")}
        }
      />
      <List
        className="employee-list"
        itemLayout="horizontal"
        dataSource={employees}
        renderItem={(item) => (
          <List.Item key={item.id} actions={[
            <Button type="text"
              onClick={() => {
                setFormData(item);
                setFormType("edit");
                setVisible(true);
              }
              }
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
                  <span className="joined-date">{item.joinedDate}</span>
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
