import React from 'react';
import RoomItem from '../RoomItem';
import Modal from '../Modal';
import './styles.scss';

const RoomsList = ({ rooms, enterRoom, createRoom, removeRoom }) => {
    return (
    <div className="rooms-list-container">
      <h2>Your rooms</h2>
      <div className="rooms-list">
        {rooms.map(room => <RoomItem key={room.name} room={room} enterRoom={enterRoom} removeRoom={removeRoom} /> )}
        <Modal createRoom={createRoom} />
      </div>
    </div>
  );
}

export default RoomsList;



