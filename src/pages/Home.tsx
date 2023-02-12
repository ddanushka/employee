import React, { useState, useEffect } from "react";
import API from "../API";
import { Table, Input, Button, Modal, Form, Radio, DatePicker } from "antd";
import {EditFilled, DeleteFilled} from '@ant-design/icons';
import moment from "moment"
const { Column } = Table;
const { TextArea } = Input;

interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: "Male" | "Female";
    joinedDate: string;
}

const Home: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState<Partial<Employee>>({});
    const [formType, setFormType] = useState<"add" | "edit">("add");

    useEffect(() => {
        const fetchData = async () => {
            const employees = await API.getEmployees();
            setEmployees(employees);
        };

        fetchData();

    }, []);

    const handleSubmit = async () => {
        if (formType === "add") {
            await API.addEmployee(formData as Employee);
        } else {
            await API.updateEmployee(formData as Employee);
        }

        setVisible(false);
        window.location.reload();

    };

    const handleDelete = async (id: string) => {
        await API.deleteEmployee(id);
        window.location.reload();
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
                            setFormData({ ...formData, firstName: e.target.value })
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
                    {/* <DatePicker
                        value={formData.joinedDate ? moment(formData.joinedDate) : null}
                        onChange={(date, dateString) =>
                            setFormData({ ...formData, joinedDate: dateString })
                        }
                        disabledDate={current => current && current > moment().endOf("day")}
                    /> */}
                </Form.Item>
            </Form>
        </Modal>
    );

    return (
        <div>
            <Button type="primary" onClick={() => setVisible(true)}>
                Add Employee
            </Button>
            <Table dataSource={employees} rowKey="id">
                <Column title="First Name" dataIndex="firstName" key="firstName" />
                <Column title="Last Name" dataIndex="lastName" key="lastName" />
                <Column title="Email" dataIndex="email" key="email" />
                <Column title="Phone" dataIndex="phone" key="phone" />
                <Column title="Gender" dataIndex="gender" key="gender" />
                <Column
                    title="Joined Date"
                    dataIndex="joinedDate"
                    key="joinedDate"
                    render={joinedDate => <span>{moment(joinedDate).format("LL")}</span>}
                />
                <Column
                    title="Action"
                    key="action"
                    render={(text, record:any) => (
                        <>
                            <EditFilled
                                style={{ fontSize: 20, color: "#08c" }}
                                onClick={() => {
                                    setFormData(record);
                                    setFormType("edit");
                                    setVisible(true);
                                }}
                            />
                            <DeleteFilled
                                type="delete"
                                style={{ fontSize: 20, color: "#08c", marginLeft: 10 }}
                                onClick={() => handleDelete(record.id)}
                            />
                        </>
                    )}
                />
            </Table>
            {renderForm()}
        </div>
    );
};

export default Home;