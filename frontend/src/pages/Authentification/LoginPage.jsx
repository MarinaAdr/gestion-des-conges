import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
      
      if (response.data.success) {
        // Stocker le token et les infos utilisateur
        localStorage.setItem('token', response.data.token);
        
        // Utiliser la fonction login du contexte
        login(response.data.user);

        // Notification de succès
        toast.success('Connexion réussie !');

        // Redirection basée sur le rôle
        if (response.data.user.role === 'ADMIN') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-3xl overflow-hidden w-full max-w-[1000px] md:h-[600px]">
        {/* Section gauche avec l'image */}
        <div className="hidden md:flex md:w-1/2 bg-gray-200 items-center justify-center p-4 lg:p-8">
          <div className="relative">
            <div className="w-48 h-48 lg:w-80 lg:h-80 bg-white rounded-full flex items-center justify-center transition-all duration-300">
              <FaUser className="text-gray-400 text-4xl lg:text-8xl" />
            </div>
            <div className="absolute top-0 left-0 w-3 h-3 lg:w-4 lg:h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 lg:w-4 lg:h-4 bg-green-400 rounded-full"></div>
            <div className="absolute top-1/2 right-0 w-2 h-2 lg:w-3 lg:h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-1/4 left-0 w-2 h-2 lg:w-3 lg:h-3 bg-purple-400 rounded-full"></div>
          </div>
        </div>

        {/* Section droite avec le formulaire */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Gestion de congé</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-lg"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white py-3 md:py-4 rounded-3xl transition duration-300 text-lg md:text-xl font-semibold`}
            >
              {loading ? 'CONNEXION...' : 'LOGIN'}
            </button>
          </form>

          <div className="text-center mt-8 md:mt-[120px] space-y-3">
            <a href="#" className="text-base text-gray-600 hover:text-gray-800">
              Forgot Username / Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;