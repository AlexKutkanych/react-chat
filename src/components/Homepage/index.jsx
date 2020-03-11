import React, { Component } from 'react';
import LoginPage from '../LoginPage';
import ChatScreen from '../ChatScreen';
import TopNavbar from '../TopNavbar';


class Homepage extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: ''
    }
  }

  handleUserSubmitted = (user) => {
    this.setState({ currentUser: user });
    const body = JSON.stringify({
      name: user
    });
    fetch('http://localhost:3001/user', {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  render(){
    return (
      <div>
        <TopNavbar user={this.state.currentUser} />
        {this.state.currentUser ?
          <ChatScreen user={this.state.currentUser}>Hello {this.state.currentUser}</ChatScreen> :
          <LoginPage handleUserSubmitted={this.handleUserSubmitted} />
        }
      </div>
    );
  }
}

export default Homepage;

