import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Pages
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Login from './pages/Authentification/Login';
import EmployeesPage from './pages/Employees/EmployeesPage';
import EmployeesForm from './pages/Employees/EmployeesForm';
import EmployeeModify from './pages/Employees/EmployeeModify';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route publique */}
        <Route path="/" element={<Login />} />
      
        <Route 
          path="/admin" 
          element={
            
              <AdminDashboard />
            
          } 
        />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/new" element={<EmployeesForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeModify />} />
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
    </BrowserRouter>
  );
}

export default App;
