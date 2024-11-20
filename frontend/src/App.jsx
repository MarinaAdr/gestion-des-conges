import { BrowserRouter, Routes, Route } from 'react-router-dom';


// Pages
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import Login from './pages/Authentification/Login';


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


      </Routes>
    </BrowserRouter>
  );
}

export default App;
