import React, { useState, useEffect } from "react";
import API from "../API";
import { Table, Input, Modal, Form, Radio, DatePicker, FloatButton } from "antd";
import { EditFilled, DeleteFilled, PlusOutlined } from '@ant-design/icons';
import EmployeeList from "../components/EmployeeList";
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




    return (
        <div>

            {/* <Table dataSource={employees} rowKey="id">
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
                    render={(text, record: any) => (
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
            {renderForm()} */}

            <EmployeeList/>
        </div>
    );
};

export default Home;
