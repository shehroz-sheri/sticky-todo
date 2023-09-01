import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'


export default function PrivateRoutes({ Component }) {
    const location = useLocation()
    const { isAuthtenicated } = useAuthContext()

    if (!isAuthtenicated)

        return <Navigate to="/auth/login"
            state={{ from: location.pathname }} replace />

    return (
        <>
            <Component />
        </>
    )
}