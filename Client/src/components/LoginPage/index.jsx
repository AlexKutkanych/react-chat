import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setUserName } from '../../actions';
import UsernameForm from '../UsernameForm';

const LoginPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  
  const handleUserSubmitted = (e, user) => {
    e.preventDefault();

    const body = JSON.stringify({
      name: user
    });

    dispatch(setUserName(user));

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

