import React, { useState } from "react";
import { message } from "antd";
import { Layout, Menu, Button } from "antd";
import { auth } from "../../config/firebase";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { MenuFoldOutlined, MenuUnfoldOutlined, ShopOutlined, DoubleRightOutlined, PicLeftOutlined, CalendarOutlined, PlusSquareFilled, LogoutOutlined, UnorderedListOutlined, DashOutlined, CheckCircleTwoTone } from "@ant-design/icons";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const { Sider, Content } = Layout;
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const handelLogout = () => {
        signOut(auth)
            .then(() => {
                message.success("Sign Out successfully");
                dispatch({
                    type: "SET_LOGGED_OUT"
                });
                navigate("/auth/login");
            })
            .catch((err) => {
                console.error(err);
                message.error("Please try again to signOut");
            });
    };
    return (
        <div className="bg-dark">
            <Layout className="" >
                <Sider trigger={null} collapsible collapsed={collapsed}
                    style={{
                        minWidth: "250px",
                        minHeight: "100vh",
                        marginRight: "10px",
                        background: "#264653",
                        margin: "0px",
                        padding: "0px",
                    }} >
                    <span style={{
                        color: "white",
                        fontSize: "20px",
                        display: "inline-block",
                        height: "40px",
                        lineHeight: "60px",
                        marginLeft: "15px",
                    }} >
                        {collapsed ? "" : "Menu"}
                    </span>
                    <Button type="text"
                        icon={collapsed ? < MenuUnfoldOutlined /> : < MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "8px",
                            width: 64,
                            height: 64,
                            color: "white",
                            float: "right",
                        }}
                    />

                    <div className="demo-logo-vertical" />
                    <Menu style={{ marginTop: "20px", background: "#F5F5F5" }}
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={
                            ["4"]
                        }
                        items={
                            [{ type: "group", key: "tasks", label: "Tasks" },

                            {
                                key: "1",
                                icon: < DoubleRightOutlined />,
                                label: (
                                    <Link style={{ textDecoration: "none" }} to="/upcoming" >
                                        Upcoming
                                    </Link>
                                ),
                            },
                            {
                                key: "2",
                                icon: <DashOutlined />,
                                label: (
                                    <Link style={{ textDecoration: "none" }} to="/today" >
                                        Today
                                    </Link>
                                ),
                            },
                            {
                                key: "3",
                                icon: < CalendarOutlined />,
                                label: (
                                    <Link style={{ textDecoration: "none" }} to="/calendar" >
                                        Calendar
                                    </Link>
                                ),
                            },

                            {
                                key: "4",
                                icon: <UnorderedListOutlined />,
                                label: (
                                    <Link style={{ textDecoration: "none" }} to="/sticky" >
                                        Sticky Wall
                                    </Link>
                                ),
                            },
                            {
                                type: "group",
                                key: "list",
                                label: "List",
                            },

                            {
                                key: "5",
                                icon: (
                                    <CheckCircleTwoTone />
                                ),
                                label: (
                                    <Link style={{ textDecoration: "none" }} to="/personal" >
                                        Personal
                                    </Link>
                                ),
                            },
                            {
                                key: "6",
                                icon: (
                                    <CheckCircleTwoTone twoToneColor='#FFA500' />
                                ),
                                label: (
                                    <Link style={{ textDecoration: "none" }} to="/business" >
                                        Business
                                    </Link>
                                ),
                            },
                            {
                                key: "7",
                                icon: (
                                    // <span style={{ height: "10px", width: "10px", backgroundColor: "yellow", }} ></span>
                                    <CheckCircleTwoTone twoToneColor='#9d8189' />
                                ),
                                label: (
                                    <Link style={{ textDecoration: "none" }} to="/list3" >
                                        List 3
                                    </Link>
                                ),
                            },

                            {
                                key: "8",
                                icon: (
                                    <PlusSquareFilled style={{ backgroundColor: "transparent", color: "white" }} />
                                ),
                                type: "group",
                                // label: "Add New List",
                            },

                            {
                                key: "9",
                                type: "group",
                                icon: < UnorderedListOutlined />,
                                label: "Settings",
                            },
                            {
                                key: "10",
                                icon: < LogoutOutlined />,
                                label: "Log Out",
                                danger: true,
                                onClick: handelLogout,
                            },
                            ]
                        }
                    />
                </Sider>
                <Layout>

                    <Content style={{
                        padding: "16px 10px",
                        maxHeight: "100vh",
                        overflow: "auto",
                        background: "white",
                    }} >
                        <Outlet />

                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}