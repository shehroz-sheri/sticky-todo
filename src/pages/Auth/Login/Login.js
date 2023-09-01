import React, {
    useState
} from "react";
import {
    Form,
    Input,
    Button,
    message,
    Typography
} from "antd";
import {
    Link
} from "react-router-dom";
import {
    auth
} from "../../../config/firebase";
import {
    signInWithEmailAndPassword
} from "firebase/auth";
import {
    useAuthContext
} from "../../../context/AuthContext";

export default function Register() {

    const {
        getProfile
    } = useAuthContext()
    const [isProcessing, setIsProcessing] = useState(false);
    const {
        Title
    } = Typography;
    const handleLogin = (values) => {
        const {
            email,
            password
        } = values;
        setIsProcessing(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                getProfile(user)
                message.success("Login successfully")
            })
            .catch((err) => {
                message.error("Something went wrong while login user.")
                console.error(err)
            })
            .finally(() => {
                setIsProcessing(false)
            })
    };
    return (
        <>
            <div className="container login py-5" >
                <div className="row w-100" >
                    <div className="col" >
                        <div className="card col-md-4 m-auto px-4 px-md-5   py-4" >
                            <Form autoComplete="off"
                                style={
                                    {
                                        textAlign: "center"
                                    }
                                }
                                onFinish={
                                    handleLogin
                                } >
                                <Title level={
                                    2
                                }
                                    className="text-center mb-3" >
                                    Login
                                </Title>
                                <Form.Item name="email"
                                    rules={
                                        [{
                                            message: "Please enter valid email",
                                            type: "email",
                                            required: true,
                                        },
                                        {
                                            whitespace: true
                                        },
                                        ]
                                    }
                                    hasFeedback >
                                    <Input placeholder="Enter Email"
                                        name="email" />
                                </Form.Item>
                                <Form.Item name="password"
                                    rules={
                                        [{
                                            required: true,
                                            message: "Please enter Password"
                                        }]
                                    }
                                    hasFeedback >
                                    <Input.Password name="password"
                                        placeholder="Enter Password" />
                                </Form.Item>
                                <Form.Item className="text-center" >
                                    <Button type="primary"
                                        htmlType="submit"
                                        loading={
                                            isProcessing
                                        }
                                        disabled={
                                            isProcessing
                                        }
                                        className="w-50" >
                                        Login
                                    </Button>
                                </Form.Item>
                                <Form.Item className="text-center" >
                                    <p className="mb-0" >
                                        Don't have an account? {
                                            " "
                                        } <Link to="/auth/register"
                                            className="" > {
                                                " "
                                            }
                                            Register Here {
                                                " "
                                            }
                                        </Link>{" "}
                                    </p>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}