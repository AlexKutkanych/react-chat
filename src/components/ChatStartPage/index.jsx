import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import uniqid from 'uniqid';
import Divider from '@material-ui/core/Divider';
import chatManager from '../../utils';
import RoomsList from '../RoomsList';
import { setUser, setUsersRooms, createRoom, deleteRoom } from '../../actions';
import './styles.scss';

const ChatStartPage = () => {
  const user = useSelector(({ usersReducer: { user }}) => user);
  const userName = useSelector(({ usersReducer: { userName }}) => userName);
  const rooms = useSelector(({ roomsReducer: { rooms }}) => rooms);

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchRooms = (userId) => {
    fetch(`http://localhost:3001/user/${userId}/rooms`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(res => dispatch(setUsersRooms(res)));
  }

  useEffect(() => {
    chatManager(userName)
    .connect()
    .then(currentUser => {
      dispatch(setUser(currentUser));
      fetchRooms(currentUser.id);
      console.log("Connected as user ", currentUser);
    })
    .catch(error => {
      console.error("error:", error);
    });
  }, [dispatch, userName]);


  const enterRoom = (roomId) => {
    history.push(`/room/${roomId}`);
  }

  const handleCreateRoom = ({ name }) => {
    user.createRoom({
      id: uniqid(`${name}-`),
      name,
      private: false,
    }).then(room => {
      dispatch(createRoom(room));
    })
    .catch(err => {
      console.log(`Error creating room ${err}`)
    })
  }

  const handleRemoveRoom = id => {
    user.deleteRoom({ roomId: id })
      .then(() => {
        console.log(`Deleted room with ID: ${id}`)
        dispatch(deleteRoom(id));
      })
      .catch(err => {
        console.log(`Error deleted room ${id}: ${err}`)
      })
  }

  return (
  <div className="chat-start-page">
    <h2>Hello, {user && user.name}</h2>
    <p>Here you can find some data</p>
    <Divider />
    <RoomsList rooms={rooms} enterRoom={enterRoom} createRoom={handleCreateRoom} removeRoom={handleRemoveRoom} />
    <br />
    <Divider />
  </div>
  );
}

export default ChatStartPage;

