import React, { useState } from 'react';
import {MdEmail} from 'react-icons/md';
import {RiEyeCloseFill, RiLockPasswordFill} from 'react-icons/ri';
import LoginImage from '../assets/login.png';


const Login = () => {
  
  return (
    <div className="flex flex-col items-center h-screen justify-center bg-[#fff] ">
      <h2 className="font-algerian text-3xl text-[#F5BCBA] ">
        Gestion des congés
      </h2>

      <div className="border shadow p-7 w-100 h-90 bg-white">
        <div className="flex flex-col items-center justify-center">
          <img src={LoginImage} alt="Login image" className="h-20 " />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>
        <form className="m-5">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <MdEmail className="text-lg" />
              <label htmlFor="email" className="">Email</label>
            </div>
            <input
              type="email"
              placeholder="exemple@gmail.com"
              className="w-full px-3 py-2 border outline-none"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <RiLockPasswordFill className='text-lg' />
              <label htmlFor="mdp" className="">
                Mot de passe
              </label>
            </div>
            <input
              type="password"
              placeholder="*******"
              className="w-full px-3 py-2 border outline-none"
            />
          </div>
          <div className="mb-4 flex items-center justify-between gap-4">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-800">Se souvenir de moi</span>
            </label>
            <a href="#" className="text-[#F5BCBA]"> Mot de passe oublié</a>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-[#F5BCBA] text-white py-2"
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
