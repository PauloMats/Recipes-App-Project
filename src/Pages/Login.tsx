import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import tomate from '../images/tomate.svg';
import recipeLogo from '../images/logo Recipes App.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setformValid] = useState(false);

  const handleEmailChange = (event: { target: { value: any; }; }) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    validateForm(newEmail, password);
  };

  const handlePasswordChange = (event: { target: { value: any; }; }) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validateForm(email, newPassword);
  };

  const navigate = useNavigate();
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (formValid) {
      localStorage.setItem('user', JSON.stringify({ email }));
    }
    navigate('/meals');
  };

  const validateForm = (newEmail: string, newPassword: string | any[]) => {
    const emailValid = /\S+@\S+\.\S+/.test(newEmail);
    const passwordValid = newPassword.length > 6;

    setformValid(emailValid && passwordValid);
  };

  return (
    <div className="layout">
      <div className="image-container">
        <img src={ recipeLogo } alt="logo" className="logo" />
        <img src={ tomate } alt="tomate" className="tomate" />
      </div>
      <div className="login-form">
        <h2 className="login">Login</h2>
        <form onSubmit={ handleSubmit } className="form-container">
          <input
            placeholder="Email"
            type="text"
            id="email"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ handleEmailChange }
          />
          <br />
          <input
            placeholder="Senha"
            type="text"
            id="password"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ handlePasswordChange }
          />
          <br />
          <button
            className="btn-container"
            type="submit"
            data-testid="login-submit-btn"
            disabled={ !formValid }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
