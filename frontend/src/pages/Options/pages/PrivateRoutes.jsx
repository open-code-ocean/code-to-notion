import { Outlet, Navigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
const PrivateRoutes = () => {
    const datastorage = {};
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            chrome.storage.sync.get(['tokens', 'user', 'isAuthenticated'], (data) => {
                setData(data);
                setLoading(false);

            });
        }
        fetchData().catch(console.error);;
    }, [])


    console.log(data);
    if (loading) {
        return <h1>Loading</h1>
    } else {

        if (data && data.isAuthenticated && data.tokens && data.user) {
            return (<Outlet />)
        } else {
            return (<Navigate to="/login" />)
        }

    }


}

export default PrivateRoutes