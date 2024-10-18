import React, {createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';


const userContext = createContext()

const authContext = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  

    useEffect(() => {
      const verifyUser = async () => {
        const token =localStorage.getItem('token')
        try {
          const response = await axios.get('http://localhost:8080/api/auth/verify', {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })
          // console.log(response)
          if(response.data.success) {
            setUser(response.data.user)
          }else{
            setUser(null)
            setLoading(false)
          }
          
        } catch (error) {
          // console.log(error)
        if(error.response && !error.response.data.error) {
          setUser(null)
        }      
        } finally{
          setLoading(false)
        }
      }
      verifyUser()
    }, [])

    const login = (user) => {
        setUser(user)
    }
    const logout = () =>{
        setUser(null)
        localStorage.removeItm("token")
    }
  return (
    <userContext.Provider value={{user, login, logout, loading}}>
        {children}
    </userContext.Provider>
  )
}
export const useAuth = () => useContext(userContext)
export default authContext