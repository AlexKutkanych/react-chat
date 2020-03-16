import React, { createRef, useEffect } from 'react';
import SpeechBubble from '../SpeechBubble';
import Spinner from '../Spinner';
import './styles.scss';

const ChatMessages = ({ messages, currentUser }) => {
  const messagesContainer = createRef()

  const scrollToBottom = () => {
    messagesContainer.current.scrollIntoView({ behavior: "smooth" });
  }
  
  useEffect(scrollToBottom, [messages]);

  return (
    <ul className='chat-messages'>
      {messages.length ? messages.map(({ parts, id, senderId, createdAt }) => (
        <SpeechBubble
          key={id}
          currentUser={currentUser}
          senderId={senderId}
          createdAt={createdAt}
          text={parts[0].payload.content}
        />
      )) :
      <Spinner loading={true} /> }
      <div ref={messagesContainer} />
    </ul>
  )
}

export default ChatMessages;

