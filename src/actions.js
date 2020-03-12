export const setUser = user => ({
  type: 'SET_CURRENT_USER',
  user
});

export const setUserName = name => ({
  type: 'SET_CURRENT_USER_NAME',
  userName: name
});

export const setCurrentRoom = currentRoom => ({
  type: 'SET_CURRENT_ROOM',
  currentRoom: currentRoom
});