import React, {useState} from 'react';
import {MdEmail} from 'react-icons/md';
import {RiLockPasswordFill} from 'react-icons/ri';
import LoginImage from '../assets/login.gif';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [error, setError] = useState(null)
  const {login} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault ();
    try {
      const response = await axios.post (
        'http://localhost:8080/api/auth/login',
        {email, password}
      );
      if(response.data.success){
        login(response.data.user)
        localStorage.setItem("token", response.data.token)
        if (response.data.user.role === "admin") {
          navigate('/admin-dashboard')
        }else {
          navigate('/employee-dashboard')
        }
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        setError(error.response.data.error)
      }else{
        setError('Erreur serveur')
      }
    }
  };
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-cyan-400 from-9% to-gray-100 to-50% space-y-6  ">
      <div className="border shadow p-7  h-90 bg-white  w-[450px] rounded-[10px]">
        <div className="flex flex-col items-center justify-center ">
          <img src={LoginImage} alt="Login image" className="h-30 w-40 " />
        </div>

        <h2 className="text-2xl font-pacific mb-4 text-center">Connexion</h2>
        {error && <p className='text-red-500 ml-[20px] '>{error}</p>}
        <form className="m-5" onSubmit={handleSubmit}>
          <div className="mb-4 ">
            <div className="flex items-center gap-2">
              <MdEmail className="text-lg" />
              <label htmlFor="email" className="text-lg">
                Email
              </label>
            </div>
            <input
              type="email"
              placeholder="exemple@gmail.com"
              className="w-full px-3 py-2 border mt-1.5 outline-none"
              onChange={e => setEmail (e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <RiLockPasswordFill className="text-lg" />
              <label htmlFor="password" className="text-lg">
                Mot de passe
              </label>
            </div>
            <input
              type="password"
              placeholder="*******"
              className="w-full px-3 py-2 border mt-1.5 outline-none"
              onChange={e => setPassword (e.target.value)}
              required
            />
          </div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-800 text-lg">
                Se souvenir de moi
              </span>
            </label>
            <a href="#" className="text-[#3bb8d8] texy-lg">
              {' '}
              Mot de passe oublié
            </a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-[#3bb8d8] text-lg text-white py-2"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
