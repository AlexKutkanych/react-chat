import React from 'react';

const RoomsList = ({ rooms, enterRoom }) => {
    return (
    <div className="chat-screen">
     {rooms.map(item => (
       <div>
         <h2>{item.name}</h2>
         <button onClick={enterRoom}>Enter group</button>
       </div>
     ))}
    </div>
  );
}

export default RoomsList;



