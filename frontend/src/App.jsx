import { BrowserRouter, Routes, Route } from 'react-router-dom';


// Pages
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Login from './pages/Authentification/Login';
import EmployeesPage from './pages/Employees/EmployeesPage';
import EmployeesForm from './pages/Employees/EmployeesForm';


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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
