import React, { Component } from 'react';
import MessageForm from '../MessageForm';
import UsersList from '../UsersList';
import ChatMessages from '../ChatMessages';
import chatManager from '../../utils';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, setCurrentRoom } from '../../actions';
import './styles.scss';

class ChatScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: [],
      usersWhoAreTyping: []
    }
  }

  componentDidMount(){
    const { match, user: { id }, setCurrentRoom, setUser } = this.props;

    chatManager(id)
      .connect()
      .then(currentUser => {
        setUser(currentUser);
        return currentUser.subscribeToRoomMultipart({
          roomId: match.params.id,
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
        .then(currentRoom => setCurrentRoom(currentRoom))
        .catch(error => {
          console.error("error:", error);
        });
      });
    
  }

  sendMessage = (e, msg) => {
    e.preventDefault();

    this.props.user.sendSimpleMessage({
      roomId: this.props.currentRoom.id,
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
    this.props.user
      .isTypingIn({ roomId: this.props.currentRoom.id })
      .then(() => {
        console.log('Success!')
      })
      .catch(err => {
        console.log(`Error sending typing indicator: ${err}`)
      });
  }
  

  render(){
    const { messages, usersWhoAreTyping } = this.state;
    const { user, currentRoom } = this.props;
    console.log(this.props, 'props');
    return (
    <div className="chat-screen">
      <div className="chat-screen__left-panel">
        {Object.keys(currentRoom).length && <UsersList users={currentRoom.userStore.users} />}
      </div>
      <div className="chat-screen__right-panel">
        <ChatMessages messages={messages} currentUser={user.id} />
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

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setCurrentRoom: currentRoom => dispatch(setCurrentRoom(currentRoom))
})


const mapStateToProps = (state) => {
  return {
    user: state.user,
    userName: state.userName,
    currentRoom: state.currentRoom
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatScreen));

