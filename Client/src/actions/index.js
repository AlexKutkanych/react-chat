export const setUser = user => ({
  type: 'SET_CURRENT_USER',
  user
});

export const userLogout = () => ({
  type: 'USER_LOGOUT'
});

export const setUserName = name => ({
  type: 'SET_CURRENT_USER_NAME',
  userName: name
});

export const setCurrentRoom = currentRoom => ({
  type: 'SET_CURRENT_ROOM',
  currentRoom
});

export const setUsersRooms = rooms => ({
  type: 'SET_CURRENT_USER_ROOMS',
  rooms
});

export const createRoom = newRoom => ({
  type: 'CREATE_ROOM',
  newRoom
});

export const deleteRoom = roomId => ({
  type: 'DELETE_ROOM',
  roomId
});

export const addRoomMessage = message => ({
  type: 'ADD_ROOM_MESSAGE',
  message
});
export const clearRoomMessage = () => ({
  type: 'CLEAR_ROOM_MESSAGE'
});