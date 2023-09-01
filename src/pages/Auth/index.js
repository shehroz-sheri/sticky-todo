import React from 'react'
import Login from "./Login/Login"
import Register from "./Register/Register"
import { Routes, Route } from 'react-router-dom'
export default function index() {
    return (
        <>
            <Routes >
                <Route path="/" >
                    <Route path='login' element={< Login />} />
                    <Route path='register' element={< Register />} />
                </Route>
            </Routes>
        </>
    )
}