import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import Logo from '../../assets/images/logo-png.png';
import { motion } from 'framer-motion';

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col md:flex-row bg-white shadow-lg rounded-3xl overflow-hidden w-full max-w-[1000px] md:h-[600px]"
      >
        {/* Section gauche avec l'image */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden md:flex md:w-1/2 bg-blue-200 items-center justify-center p-4 lg:p-8 relative overflow-hidden"
        >
          <div className="relative w-full h-full">
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="w-48 h-48 lg:w-80 lg:h-80 bg-white rounded-full flex items-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <FaUser className="text-gray-400 text-4xl lg:text-8xl" />
            </motion.div>
            
            {/* Points décoratifs avec mouvement */}
            <motion.div 
              animate={{ 
                x: [0, 100, -100, 0],
                y: [0, -100, 100, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-1/4 left-1/4 w-4 h-4 lg:w-6 lg:h-6 bg-blue-400 rounded-full shadow-lg"
            />
            <motion.div 
              animate={{ 
                x: [0, -120, 120, 0],
                y: [0, 120, -120, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute bottom-1/4 right-1/4 w-4 h-4 lg:w-6 lg:h-6 bg-green-400 rounded-full shadow-lg"
            />
            <motion.div 
              animate={{ 
                x: [0, 150, -150, 0],
                y: [0, -150, 150, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-1/3 right-1/3 w-3 h-3 lg:w-5 lg:h-5 bg-yellow-400 rounded-full shadow-lg"
            />
            <motion.div 
              animate={{ 
                x: [0, -80, 80, 0],
                y: [0, 80, -80, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute bottom-1/3 left-1/3 w-3 h-3 lg:w-5 lg:h-5 bg-purple-400 rounded-full shadow-lg"
            />
            
            {/* Points additionnels avec mouvement */}
            <motion.div 
              animate={{ 
                x: [0, 120, -120, 0],
                y: [0, -120, 120, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 13,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-1/2 left-1/2 w-4 h-4 lg:w-6 lg:h-6 bg-pink-400 rounded-full shadow-lg"
            />
            <motion.div 
              animate={{ 
                x: [0, -100, 100, 0],
                y: [0, 100, -100, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 11,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute bottom-1/2 right-1/2 w-3 h-3 lg:w-5 lg:h-5 bg-indigo-400 rounded-full shadow-lg"
            />
            <motion.div 
              animate={{ 
                x: [0, 90, -90, 0],
                y: [0, -90, 90, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 9,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-2/3 left-1/3 w-4 h-4 lg:w-6 lg:h-6 bg-orange-400 rounded-full shadow-lg"
            />
            <motion.div 
              animate={{ 
                x: [0, -110, 110, 0],
                y: [0, 110, -110, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 14,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute bottom-2/3 right-1/3 w-3 h-3 lg:w-5 lg:h-5 bg-teal-400 rounded-full shadow-lg"
            />
            <motion.div 
              animate={{ 
                x: [0, 130, -130, 0],
                y: [0, -130, 130, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 16,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-1/4 right-1/4 w-4 h-4 lg:w-6 lg:h-6 bg-red-400 rounded-full shadow-lg"
            />
            <motion.div 
              animate={{ 
                x: [0, -140, 140, 0],
                y: [0, 140, -140, 0],
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 17,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute bottom-1/4 left-1/4 w-3 h-3 lg:w-5 lg:h-5 bg-cyan-400 rounded-full shadow-lg"
            />
          </div>
        </motion.div>

        {/* Section droite avec le formulaire */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full md:w-1/2 p-6 md:p-12 lg:p-16"
        >
    
          {/* <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8"
          >
            LeaveLy
          </motion.h2> */}
          <motion.img 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            src={Logo} 
            alt="Logo" 
            className="w-100 h-32 md:w-90 md:h-40 mx-auto mb-4" 
          />
          
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              />
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="relative"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 bg-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              />
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? 'bg-blue-400' : 'bg-blue-400 hover:bg-blue-500'
              } text-white py-3 rounded-3xl transition duration-300 text-lg font-semibold`}
            >
              {loading ? 'CONNEXION...' : 'LOGIN'}
            </motion.button>
          </form>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="text-center mt-6 md:mt-8"
          >
            <a href="#" className="text-sm md:text-base text-gray-600 hover:text-gray-800">
              Forgot Username / Password?
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;