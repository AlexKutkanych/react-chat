import React from 'react';
import './styles.scss';

const SpeechBubble = ({ currentUser, senderId, text, createdAt }) => {
  return (
    <div className={`speech-bubble ${currentUser === senderId ? 'speech-bubble__current-user' : ''}`}>
      <p><strong>{senderId}</strong> <span className='speech-bubble__time'>{createdAt}</span></p>
      <p>{text}</p>
  </div>);
}

export default SpeechBubble;