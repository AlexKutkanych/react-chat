import React, { useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import MessageForm from '../MessageForm';
import UsersList from '../UsersList';
import ChatMessages from '../ChatMessages';
import Spinner from '../Spinner';
import chatManager from '../../utils';

import { useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setCurrentRoom, addRoomMessage, clearRoomMessage } from '../../actions';
import './styles.scss';

const ChatScreen = () => {
  const user = useSelector(({ usersReducer: { user }}) => user);
  const messages = useSelector(({ roomsReducer: { messages }}) => messages);
  const currentRoom = useSelector(({ roomsReducer: { currentRoom }}) => currentRoom);

  const [usersWhoAreTyping, setUsersWhoAreTyping] = useState([]);

  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    chatManager(user.id)
    .connect()
    .then(currentUser => {
      dispatch(setUser(currentUser));
      return currentUser.subscribeToRoomMultipart({
        roomId: match.params.id,
        hooks: {
          onMessage: message => dispatch(addRoomMessage(message)),
          onUserJoined: user => console.log(`User ${user.name} joined`),
          onUserStartedTyping: ({ name }) => setUsersWhoAreTyping(oldUsers => [...oldUsers, name]),
          onUserStoppedTyping: ({ name }) => setUsersWhoAreTyping(usersWhoAreTyping.filter(userName => userName !== name))
        },
        messageLimit: 20
      })
      .then(currentRoom => dispatch(setCurrentRoom(currentRoom)))
      .catch(error => {
        console.error("error:", error);
      });
    });

    return () => dispatch(clearRoomMessage())
  }, [dispatch, match.params.id, user.id, usersWhoAreTyping]);

  useBeforeunload(() => dispatch(clearRoomMessage()));
  
  const sendMessage = (e, msg) => {
    e.preventDefault();

    user.sendSimpleMessage({
      roomId: currentRoom.id,
      text: msg,
    })
    .then(messageId => {
      console.log(`Added message to ${messageId}`);
    })
    .catch(err => {
      console.log(`Error adding message to ${err}`)
    })
  }

  const sendTypingEvent = () => {
    user
      .isTypingIn({ roomId: currentRoom.id })
      .then(() => {
        console.log('Success!')
      })
      .catch(err => {
        console.log(`Error sending typing indicator: ${err}`)
      });
  }

  const renderTypingUsers = (users) => {
    return users.length === 1 ? <span><strong>{users[0]}</strong> is typing...</span> : 
      users.length > 1 ? <span><strong>{users.join(', ')}</strong> is typing...</span> :
      null;
  }

    return (
    <div className="chat-screen">
      <div className="chat-screen__left-panel">
        {Object.keys(currentRoom).length ? <UsersList users={currentRoom.userStore.users} /> :
        <Spinner loading={true} />}
      </div>
      <div className="chat-screen__right-panel">
        <ChatMessages messages={messages || []} currentUser={user.id} />
        <div className="chat-screen__message-block">
          <p className="chat-screen__typing-users">{renderTypingUsers(usersWhoAreTyping)}</p>
          <MessageForm sendMessage={sendMessage} onChange={sendTypingEvent} />
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;

