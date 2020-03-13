import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import Divider from '@material-ui/core/Divider';
import chatManager from '../../utils';
import RoomsList from '../RoomsList';
import { setUser, setCurrentRoom, setUsersRooms, createRoom, deleteRoom, userLogout } from '../../actions';
import './styles.scss';

class ChatStartPage extends Component {
  componentDidMount(){
    chatManager(this.props.userName)
      .connect()
      .then(currentUser => {
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
    .then(res => this.props.setUsersRooms(res));
  }

  enterRoom = (roomId) => {
    this.props.history.push(`/room/${roomId}`);
  }

  createRoom = ({ name }) => {
    this.props.user.createRoom({
      id: uniqid(`${name}-`),
      name,
      private: false,
    }).then(room => {
      this.props.createRoom(room);
    })
    .catch(err => {
      console.log(`Error creating room ${err}`)
    })
  }

  removeRoom = id => {
    this.props.user.deleteRoom({ roomId: id })
      .then(() => {
        console.log(`Deleted room with ID: ${id}`)
        this.props.deleteRoom(id);
      })
      .catch(err => {
        console.log(`Error deleted room ${id}: ${err}`)
      })
  }
  
  render(){
    const { user, rooms } = this.props;
    
    return (
    <div className="chat-start-page">
      <h2 onClick={this.disconnect}>Hello, {user && user.name}</h2>
      <p>Here you can find some data</p>
      <Divider />
      <RoomsList rooms={rooms} enterRoom={this.enterRoom} createRoom={this.createRoom} removeRoom={this.removeRoom} />
      <br />
      <Divider />
    </div>
  );
  }
}

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setCurrentRoom: currentRoom => dispatch(setCurrentRoom(currentRoom)),
  setUsersRooms: rooms => dispatch(setUsersRooms(rooms)),
  userLogout: () => dispatch(userLogout()),
  createRoom: newRoom => dispatch(createRoom(newRoom)),
  deleteRoom: roomId => dispatch(deleteRoom(roomId))
})


const mapStateToProps = ({ usersReducer: { user, userName }, roomsReducer: { currentRoom, rooms }}) => {
  return {
    user: user,
    userName: userName,
    currentRoom: currentRoom,
    rooms: rooms
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatStartPage));

