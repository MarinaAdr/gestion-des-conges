import React from 'react';
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa';

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-3xl overflow-hidden w-full max-w-[1000px] md:h-[600px]">
        {/* Section gauche avec l'image */}
        <div className="hidden md:flex md:w-1/2 bg-gray-200 items-center justify-center p-4 lg:p-8">
          <div className="relative">
            <div className="w-48 h-48 lg:w-80 lg:h-80 bg-white rounded-full flex items-center justify-center transition-all duration-300">
              <FaUser className="text-gray-400 text-4xl lg:text-8xl" />
            </div>
            {/* Points décoratifs */}
            <div className="absolute top-0 left-0 w-3 h-3 lg:w-4 lg:h-4 bg-blue-400 rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 lg:w-4 lg:h-4 bg-green-400 rounded-full"></div>
            <div className="absolute top-1/2 right-0 w-2 h-2 lg:w-3 lg:h-3 bg-yellow-400 rounded-full"></div>
            <div className="absolute bottom-1/4 left-0 w-2 h-2 lg:w-3 lg:h-3 bg-purple-400 rounded-full"></div>
          </div>
        </div>

        {/* Section droite avec le formulaire */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Gestion de congé</h2>
          <form className="space-y-6 md:space-y-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-lg"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 md:h-6 md:w-6 text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-slate-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-base md:text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-3xl hover:bg-blue-700 transition duration-300 text-lg md:text-xl font-semibold mt-4 md:mt-6"
            >
              LOGIN
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

export default Login;