import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavigateToProfile() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/profile');
  }

  return (
    <button onClick={ handleClick }>Ir para perfil</button>
  );
}

export default NavigateToProfile;
