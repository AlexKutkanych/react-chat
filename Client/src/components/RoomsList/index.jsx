import React from 'react';
import RoomItem from '../RoomItem';
import Modal from '../Modal';
import Spinner from '../Spinner';
import './styles.scss';

const RoomsList = ({ rooms, enterRoom, createRoom, removeRoom, isLoading }) => {
    return (
    <div className="rooms-list-container">
      <h2>Your rooms</h2>
      {isLoading ? <Spinner loading={isLoading} /> :
      rooms.length ?
      (<div className="rooms-list">
        {rooms.map(room => <RoomItem key={room.name} room={room} enterRoom={enterRoom} removeRoom={removeRoom} /> )}
        <Modal createRoom={createRoom}>Add Room</Modal>
      </div>
      ) : (<div className='rooms-list__no-rooms'>
          <span className='rooms-list__add-room'>Start by adding your room</span><Modal createRoom={createRoom}>Add Room</Modal>
        </div>)}
    </div>
  );
}

export default RoomsList;



