import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom'
import Login from './Pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './Pages/EmployeeDashboard'


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/'element={<Navigate to="/admin-dasboard"/>}></Route>
    <Route path='/login'element={<Login/>}></Route>
    <Route path='/admin-dashboard'element={<AdminDashboard/>}></Route>
    <Route path='/employee-dashboard'element={<EmployeeDashboard/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
