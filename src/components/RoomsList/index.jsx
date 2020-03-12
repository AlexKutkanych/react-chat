import React from 'react';
import RoomItem from '../RoomItem';

const RoomsList = ({ rooms, enterRoom }) => {
    return (
    <div className="chat-screen">
     {rooms.map(room => <RoomItem room={room} enterRoom={enterRoom} /> )}
    </div>
  );
}

export default RoomsList;



