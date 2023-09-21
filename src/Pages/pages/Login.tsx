import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Login</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleEmailChange }
        />
        <br />
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          name="password"
          data-testid="password-input"
          value={ password }
          onChange={ handlePasswordChange }
        />
        <br />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !formValid }

        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
