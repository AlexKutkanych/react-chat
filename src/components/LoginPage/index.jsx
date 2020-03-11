import React from 'react';
import { useHistory } from 'react-router-dom';
import UsernameForm from '../UsernameForm';

const LoginPage = () => {
  let history = useHistory();
  
  const handleUserSubmitted = (e, user) => {
    e.preventDefault();

    const body = JSON.stringify({
      name: user
    });

    fetch('http://localhost:3001/user', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(() => history.push('/homepage'));
  }

  return (
    <UsernameForm handleUserSubmitted={handleUserSubmitted} />
  )
}

export default LoginPage;

