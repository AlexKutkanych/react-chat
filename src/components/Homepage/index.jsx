import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

const Homepage = () => {
  return (
    <div className='homepage-wrapper'>
      <div>
        <img src="https://img.icons8.com/doodle/96/000000/hand-peace.png" alt='hand icon' />
        <h1>Welcome to GoChat app!</h1>
        <p>Please go to <Link to="/login">Login Page</Link> to start chatting!</p>
      </div>
    </div>
  );
}

export default Homepage;

