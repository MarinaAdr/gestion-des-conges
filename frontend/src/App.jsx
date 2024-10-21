import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import Login from './Pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './Pages/EmployeeDashboard';
import PrivateRoutes from './utils/privateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import ListeDepartement from './components/departement/ListeDepartement';
import AjoutDepartement from './components/departement/AjoutDepartement';
import EditDepartement from './components/departement/EditDepartement';

function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin-dasboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={['admin']}>
                <AdminDashboard />
              </RoleBaseRoutes>

            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />} />
          <Route
            path="/admin-dashboard/departements"
            element={<ListeDepartement />}
          />
          <Route
            path="/admin-dashboard/ajout-departement"
            element={<AjoutDepartement />}
          />
          <Route
            path="/admin-dashboard/departements/:id"
            element={<EditDepartement />}
          />
        </Route>
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
