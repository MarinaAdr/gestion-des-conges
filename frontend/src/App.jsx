import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom'
import Login from './Pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import EmployeeDashboard from './Pages/EmployeeDashboard'
import PrivateRoutes from './utils/privateRoutes'
import RoleBaseRoutes from './utils/RoleBaseRoutes'
import AdminSummary from './components/dashboard/AdminSummary'
import ListeDepartement from './components/departement/ListeDepartement'


function App() {

  return (
   <BrowserRouter>
   <Routes>
    <Route path='/'element={<Navigate to="/admin-dasboard"/>}></Route>
    <Route path='/login'element={<Login/>}></Route>
    <Route path='/admin-dashboard'element={
      <PrivateRoutes>
         <RoleBaseRoutes requiredRole={["admin"]}>
          <AdminDashboard/>
         </RoleBaseRoutes>
           
      </PrivateRoutes>
   
      }>
        <Route index element={<AdminSummary/>}></Route>
        <Route path='/admin-dashboard/departements' element={<ListeDepartement/>}></Route>
      </Route>
    <Route path='/employee-dashboard'element={<EmployeeDashboard/>}></Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
