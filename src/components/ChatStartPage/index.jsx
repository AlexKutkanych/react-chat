import React, { Component } from 'react';
import chatManager from '../../utils';
import RoomsList from '../RoomsList';

class ChartStartPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {},
      rooms: []
    }
  }

  componentDidMount(){
    chatManager(this.props.user)
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });

        this.fetchRooms(currentUser.id);
        console.log("Connected as user ", currentUser);
      })
      .catch(error => {
        console.error("error:", error);
      });
  }

  fetchRooms = (userId) => {
    fetch(`http://localhost:3001/user/${userId}/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => this.setState({ rooms: res })) 
  }

  enterRoom = () => {

  }
  
  render(){
    return (
    <div className="chat-screen">
      Hello, {this.state.currentUser.name}
      <RoomsList rooms={this.state.rooms} enterRoom={this.enterRoom} />
    </div>
  );
  }
}

export default ChartStartPage;

