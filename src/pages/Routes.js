import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import NoPage from './NoPage'
import Frontend from "./Frontend"
import Auth from "./Auth"
import { useAuthContext } from '../context/AuthContext'
import PrivateRoutes from '../components/PrivateRoutes'


export default function Index() {
    const { isAuthtenicated } = useAuthContext()
    return (
        <Routes >
            <Route path='/*' element={< PrivateRoutes Component={Frontend} />} />
            <Route path='/auth/*' element={!isAuthtenicated ? < Auth /> : < Navigate to="/" />} />
            <Route path='*' element={< NoPage />} />
        </Routes>
    )
}