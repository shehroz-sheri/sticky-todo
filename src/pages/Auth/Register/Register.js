import React, { useState } from 'react'
import { Form, Select, Input, Checkbox, Button, Typography, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { doc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, firestore } from '../../../config/firebase'


const { Title } = Typography

export default function Register() {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleFinish = async (values) => {
        const { email, password, fullname, gender, aggrement } = values
        setIsLoading(true)
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                getUser(user, fullname, gender, aggrement)
            })
            .catch((err) => {
                console.error(err);
                message.error("Something went wrong,email already registered")
            }).finally(() => {
                setIsLoading(false)
            });

    }
    const getUser = async (user, fullname, gender, aggrement) => {

        const { email, uid } = user
        const formData = {
            fullname, gender, aggrement,
            createdBy: {
                email: email,
                uid: uid
            },
            dateCreated: serverTimestamp(),
            status: "Active",
        }
        try {
            await setDoc(doc(firestore, "users", uid), formData);
            navigate("/auth/login")
            message.success("Registration Completed")
        }
        catch (err) {
            console.error(err);
            message.error("Something went wrong while creating user profile")
        }
    }

    const handleFailure = () => {
        message.error('Fill all the input fields correctly')
    }
    return (
        <>
            <div className="container register  py-5" >
                <div className="row w-100" >
                    <div className="col " >
                        <div className="card col-md-4 m-auto  px-4 px-md-5  py-4" >
                            <Form autoComplete='off' onFinish={handleFinish} onFinishFailed={handleFailure} style={{ textAlign: "center", }} >
                                <Title level={2} className='text-center mb-3' > Register </Title>
                                <Form.Item name="fullname"
                                    rules={
                                        [
                                            {
                                                whitespace: true,
                                            },
                                            {
                                                message: "Please enter atleast 3 characters",
                                                min: 3,
                                                required: true
                                            },
                                        ]
                                    } hasFeedback >
                                    <Input name="fullname" placeholder='Enter Full Name' />
                                </Form.Item>
                                <Form.Item name="email"
                                    rules={
                                        [

                                            {
                                                message: "Please enter valid email",
                                                type: "email",
                                                required: true
                                            },
                                            {
                                                whitespace: true
                                            },
                                        ]
                                    } hasFeedback >
                                    <Input name="email" placeholder='Enter Email' />
                                </Form.Item>
                                <Form.Item name="password"
                                    rules={
                                        [{
                                            required: true,
                                            min: 6,
                                            message: "Please enter at least 6 characters"
                                        }]
                                    } hasFeedback >
                                    <Input.Password name="password" placeholder='Enter Password' />
                                </Form.Item >
                                <Form.Item name="cpassword"
                                    dependencies={
                                        ['password']
                                    }
                                    rules={
                                        [{
                                            required: true,
                                            message: "Please enter Confirm Password"
                                        },
                                        ({
                                            getFieldValue
                                        }) => ({
                                            validator: (_, value) => {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve()
                                                }
                                                return Promise.reject("Password does'nt match")
                                            }
                                        })
                                        ]
                                    } hasFeedback >
                                    <Input.Password name="cpassword" placeholder='Confirm Password' />
                                </Form.Item >
                                <Form.Item name="gender" hasFeedback >
                                    <Select name="gender" placeholder="Select Your Gender" >
                                        <Select.Option value="male" > Male </Select.Option>
                                        <Select.Option value="female" > Female </Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="aggrement"
                                    valuePropName='checked'
                                    rules={
                                        [{
                                            required: true,
                                            message: ""
                                        },
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() :
                                                    Promise.reject("To proceed, Accept our terms and conditions")

                                        }
                                        ]
                                    } >

                                    <Checkbox name="aggrement" >
                                        <p className='mb-0' > Agree to our <Link href='/' > Terms and Conditions </Link></p >
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item className='text-center' >

                                    <Button type='primary' htmlType='submit' className='w-50' loading={isLoading} disabled={isLoading} >
                                        Register
                                    </Button>
                                </Form.Item>
                                <Form.Item className='text-center' >
                                    <p className='mb-0' >Already have an account?
                                        <Link to="/auth/login" className='mx-2' >Login Here</Link>
                                    </p >
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}