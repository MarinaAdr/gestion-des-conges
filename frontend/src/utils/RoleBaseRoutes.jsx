import React, { Children } from 'react'
import { useAuth } from '../context/authContext'
import { Navigate } from 'react-router-dom'
import { Spinner } from "@material-tailwind/react";

const RoleBaseRoutes = ({children, requiredRole}) => {
    const { user, loading} = useAuth()

    if (loading){
       return <div>
        <Spinner className="h-12 w-12" />
       </div>
    }
    if (!requiredRole.includes(user.role)){
        <Navigate to="/unauthorized"/> 
    }
    return user ? children : <Navigate to="/login"/>

}

export default RoleBaseRoutes