import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import MessageForm from '../MessageForm';
import UsersList from '../UsersList';
import ChatMessages from '../ChatMessages';
import './styles.scss';

class ChatScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      roomId: '948a435e-d35b-408a-b2aa-f24710c61be2',
      currentUser: {},
      currentRoom: {},
      usersWhoAreTyping: []
    }
  }

  componentDidMount(){
    const chatManager = new ChatManager({
      instanceLocator: 'v1:us1:d0ec4f24-daa6-409c-8f66-cec95c62b14a', 
      userId: this.props.user,
      tokenProvider: new TokenProvider({
        url: 'http://localhost:3001/authenticate'
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });
        console.log("Connected as user ", currentUser);
        return currentUser.subscribeToRoomMultipart({
          roomId: this.state.roomId,
          hooks: {
            onMessage: message => {
              this.setState({ 
                messages: [
                  ...this.state.messages, message
                ]
                });
            },
            onUserJoined: user => console.log(`User ${user.name} joined`),
            onUserStartedTyping: ({ name }) => {
              this.setState({
                usersWhoAreTyping: [...this.state.usersWhoAreTyping, name]
              });
            },
            onUserStoppedTyping: ({ name }) => {
              this.setState({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(userName => userName !== name)
              })
            },
          },
          messageLimit: 100
        })
      })
      .then(currentRoom => this.setState({ currentRoom }))
      .catch(error => {
        console.error("error:", error);
      });
  }

  sendMessage = (e, msg) => {
    e.preventDefault();
    this.state.currentUser.sendSimpleMessage({
      roomId: this.state.roomId,
      text: msg,
    })
    .then(messageId => {
      console.log(`Added message to ${messageId}`);
    })
    .catch(err => {
      console.log(`Error adding message to ${err}`)
    })
  }

  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({ roomId: this.state.currentRoom.id })
      .then(() => {
        console.log('Success!')
      })
      .catch(err => {
        console.log(`Error sending typing indicator: ${err}`)
      });
  }
  

  render(){
    const { currentUser, currentRoom, messages, usersWhoAreTyping } = this.state;
    return (
    <div className="chat-screen">
      <div className="chat-screen__left-panel">
        {Object.keys(currentRoom).length && <UsersList users={this.state.currentRoom.userStore.users} />}
      </div>
      <div className="chat-screen__right-panel">
        <ChatMessages messages={messages} currentUser={currentUser.id} />
        <div className="chat-screen__message-block">
          <p className="chat-screen__typing-users">{renderTypingUsers(usersWhoAreTyping)}</p>
          <MessageForm sendMessage={this.sendMessage} onChange={this.sendTypingEvent} />
        </div>
      </div>
    </div>
  );
  }
}

const renderTypingUsers = (users) => {
  return users.length === 1 ? <span><strong>{users[0]}</strong> is typing...</span> : 
    users.length > 1 ? <span><strong>{users.join(', ')}</strong> is typing...</span> :
    null;
}

export default ChatScreen;

