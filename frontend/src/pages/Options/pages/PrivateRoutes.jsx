import { Outlet, Navigate } from 'react-router-dom'
import React from 'react'
const PrivateRoutes = () => {
    const token = JSON.parse(localStorage.getItem('tokens')) || {};
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const isAuthenticated = localStorage.getItem('isAuthenticated') || false;
    console.log(Object.keys(token).length, Object.keys(user).length, isAuthenticated)
    if (Object.keys(token).length && Object.keys(user).length && isAuthenticated) {
        return (<Outlet />)
    } else {
        localStorage.removeItem('tokens');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        return (<Navigate to="/login" />)
    }

}

export default PrivateRoutes