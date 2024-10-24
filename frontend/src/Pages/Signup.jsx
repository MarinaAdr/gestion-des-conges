import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login', 
        { email, password }
      );
      if (response.data.success) {
        login(response.data.user);
        localStorage.setItem("token", response.data.token);
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard');
        } else {
          navigate('/employee-dashboard');
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error);
      } else {
        setError('Erreur serveur');
      }
    }
  };

  // Fonction pour inverser l'état de visibilité du mot de passe
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Sign Up</h2>
          <p className="text-xs mt-4 text-[#002D74]">Create a new account</p>
          
          {error && <p className="text-red-500">{error}</p>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <svg
                onClick={togglePasswordVisibility}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Sign Up
            </button>
          </form>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
            alt="Signup visual"
          />
        </div>
      </div>
    </section>
  );
};

export default Signup;
