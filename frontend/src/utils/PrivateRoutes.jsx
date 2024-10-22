import React from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'
import { Spinner } from "@material-tailwind/react";

const PrivateRoutes = ({children}) => {
    const {user, loading} = useAuth()
    if(loading) {
        return <div>
            <Spinner className="h-12 w-12" />
        </div>
    }
    return user ? children : <Navigate to="/login"/>


}

export default PrivateRoutes