import React from 'react';
import './Login.css'; 

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h2>Login</h2>
        </div>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Email or phone number" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot your password?</a>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
      <div className="login-illustration">
        <img src="laptop-illustration.png" alt="Laptop illustration" />
      </div>
    </div>
  );
}

export default LoginPage;
