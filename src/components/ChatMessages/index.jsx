import React from 'react';
import SpeechBubble from '../SpeechBubble';
import './styles.scss';

const ChatMessages = ({ messages, currentUser }) => {
  return (
    <ul className='chat-messages'>
      {messages.map(({ parts, id, senderId, createdAt }) => (
        <SpeechBubble
          key={id}
          currentUser={currentUser}
          senderId={senderId}
          createdAt={createdAt}
          text={parts[0].payload.content}
        />
      ))}
    </ul>
  )
}

export default ChatMessages;

