import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/protected/ProtectedRoute';

// Pages
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Login from './pages/Authentification/LoginPage';
import EmployeesPage from './pages/Employees/EmployeesPage';
import EmployeesForm from './pages/Employees/EmployeesForm';
import EmployeeModify from './pages/Employees/EmployeeModify';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard';
import SoldeConges from './pages/employee/SoldeConges';
import DemandeConges from './pages/employee/DemandeConges';
import MonProfil from './pages/employee/MonProfil';
import CalendrierEquipe from './pages/employee/CalendrierEquipe';
import { useAuth } from './contexts/AuthContext'; 
import EmployeeLayout from './components/layout/EmployeeLayout';
import AdminLayout from './components/layout/AdminLayout';
import RequetesPage from './pages/Admin/RequetesPage';
import CalendrierPage from './pages/Admin/CalendrierPage';
import JoursFeries from './pages/Admin/JoursFeries';



function App() {
  const { user } = useAuth();

  // Redirection si non authentifié
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      {/* Route publique */}
      <Route path="/login" element={<Login />} />

      {/* Routes protégées employé */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <EmployeeLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="solde-conges" element={<SoldeConges />} />
        <Route path="demande-conges" element={<DemandeConges />} />
        <Route path="mon-profil" element={<MonProfil />} />
        <Route path="calendrier-equipe" element={<CalendrierEquipe />} />
      </Route>

      {/* Routes protégées admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="employees-form" element={<EmployeesForm />} />
        <Route path="employee-modify" element={<EmployeeModify />} />
       
        <Route path="requests" element={<RequetesPage />} />
       
        <Route path="calendrier" element={<CalendrierPage />} />
        <Route path="jours-feries" element={<JoursFeries />} />
      </Route>

      {/* Route 404 */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
