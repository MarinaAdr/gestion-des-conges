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

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Route publique */}
          <Route path="/login" element={<Login />} />
          
          {/* Routes Admin */}
          <Route path="/admin/*" element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="employees" element={<EmployeesPage />} />
                <Route path="employees/new" element={<EmployeesForm />} />
                <Route path="employees/edit/:id" element={<EmployeeModify />} />
              </Routes>
            </ProtectedRoute>
          } />

          {/* Routes Employé */}
          <Route path="/employee/*" element={
            <ProtectedRoute allowedRoles={['EMPLOYEE']}>
              <Routes>
                <Route path="/" element={<EmployeeDashboard />} />
                {/* Ajoutez d'autres routes employé ici */}
              </Routes>
            </ProtectedRoute>
          } />

          {/* Redirection par défaut vers login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Redirection des routes inconnues vers login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
