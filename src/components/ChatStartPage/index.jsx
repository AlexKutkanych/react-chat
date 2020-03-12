import React, { Component } from 'react';
import chatManager from '../../utils';
import RoomsList from '../RoomsList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, setCurrentRoom } from '../../actions';

class ChatStartPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: {},
      rooms: []
    }
  }

  componentDidMount(){
    chatManager(this.props.userName)
      .connect()
      .then(currentUser => {
        this.setState({ currentUser });

        this.props.setUser(currentUser);
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

  enterRoom = (roomId) => {
    this.props.history.push(`/room/${roomId}`);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatStartPage));

