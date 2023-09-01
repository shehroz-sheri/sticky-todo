import React, { useState } from "react";
import { Card, Modal, message, Input, Select, Button, Form, DatePicker, ColorPicker, Typography, } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore/lite";
import { firestore } from "../../config/firebase";
import ShowTask from "./ShowTask";
import { useAuthContext } from "../../context/AuthContext";


export default function AddTask() {
    const { user } = useAuthContext();
    const { Title } = Typography;
    // const [color, setColor] = useState("#FFFF00");
    const [date, setDate] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [addTodo, setAddTodo] = useState({});

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleDate = (_, date) => {
        setDate(date);
    };
    const handleFinish = async (values) => {
        const {
            title,
            description,
            todoType
        } = values;

        const todoId = Math.random().toString(36).slice(2);
        const todo = {
            title,
            description,
            todoType,
            date,
            id: todoId,
            createdBy: {
                email: user.createdBy.email,
                uid: user.createdBy.uid,
                fullname: user.fullname,
            },
        };

        try {
            setIsLoading(true);
            await setDoc(doc(firestore, "todos", todo.id), todo);
            setAddTodo(todo);
            message.success("Todo has been added successfully");
        }
        catch (error) {
            console.error(error);
            message.error("Something went wrong while adding Todo");
        }

        setIsLoading(false);
        setIsModalOpen(false);
    };
    const handleFinishFailed = () => {
        message.error("Something went wrong while adding Todo");
    };

    return (
        <>
            <div className="container-fluid " >
                <div className="row  " >
                    <div className="col " >
                        <h1 className="mt-3 mb-4" > Sticky Wall </h1>
                        <Card bordered={false} onClick={showModal}
                            style={
                                {
                                    maxWidth: 300,
                                    color: 'white',
                                    minHeight: 300,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginLeft: "5px ",
                                    backgroundColor: "#264653",
                                    boxShadow: "0px 16px 48px 0px rgba(0, 0, 0, 0.176)",
                                }
                            } hoverable={true} >
                            <AiOutlinePlus style={{ fontSize: "50", fontWeight: "light" }} />
                        </Card>
                        <ShowTask addTodo={addTodo} />
                        <Modal open={isModalOpen} onCancel={() => { setIsModalOpen(false); }} onOk={() => { setIsModalOpen(false); }} >
                            <Form layout="vertical" onFinish={handleFinish} onFinishFailed={handleFinishFailed} >
                                <Title level={2}>
                                    Add Todo
                                </Title>
                                <div className="d-flex justify-content-between">
                                    <Form.Item className="w-100" name="todoType"
                                        rules={
                                            [{
                                                required: true,
                                                message: "Please Select Category"
                                            },]
                                        }
                                        hasFeedback >
                                        <Select name="todoType"
                                            className="text-center"
                                            placeholder="Todo Category" >
                                            <Select.Option value="Personal" > Personal </Select.Option>
                                            <Select.Option value="Bussiness" > Business </Select.Option>
                                            <Select.Option value="List3" > List 3 </Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <Form.Item name="title"
                                    rules={
                                        [{
                                            required: true,
                                            min: 5,
                                            message: "Title must contain at least 5 characters.",
                                        },]
                                    }
                                    hasFeedback >
                                    <Input name="title" placeholder="Enter Title" />
                                </Form.Item>
                                <Form.Item name="description"
                                    rules={
                                        [{
                                            required: true,
                                            min: 10,
                                            message: "Description must contain at least 10 characters.",
                                        },]
                                    }
                                    hasFeedback >
                                    <Input.TextArea name="description" placeholder="Enter Description" />
                                </Form.Item>
                                <Form.Item name="dob"
                                    rules={
                                        [{
                                            required: true,
                                            message: "Please Select Date",
                                        },]
                                    }
                                    hasFeedback >
                                    <DatePicker name="dob" placeholder="Select date" className="w-100 text-center" onChange={handleDate} />
                                </Form.Item>
                                <Form.Item className="text-center" >
                                    <Button type="primary" className="w-25" loading={isLoading} disabled={isLoading} htmlType="submit" >
                                        Add Todo
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
}