import React, { Component } from 'react';
import LoginPage from '../LoginPage';
import ChatStartPage from '../ChatStartPage';

class Homepage extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: ''
    }
  }

  render(){
    return (
      <div>
        {this.state.currentUser ?
          <ChatStartPage user={this.state.currentUser} /> :
          // <ChatScreen user={this.state.currentUser}>Hello {this.state.currentUser}</ChatScreen> :
          <LoginPage handleUserSubmitted={this.handleUserSubmitted} />
        }
      </div>
    );
  }
}

export default Homepage;

