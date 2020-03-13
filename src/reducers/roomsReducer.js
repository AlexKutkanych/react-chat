const initState = {
  currentRoom: {},
  rooms: [],
  messages: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER_ROOMS':
      return {
        ...state,
        rooms: action.rooms
      }
    case 'SET_CURRENT_ROOM':
      return {
        ...state,
        currentRoom: action.currentRoom
      }
    case 'ADD_ROOM_MESSAGE':
      return {
        ...state,
          messages: [
            ...state.messages,
            action.message
          ]
      }
    case 'CLEAR_ROOM_MESSAGE':
      return {
        ...state,
          messages: []
      }
    case 'CREATE_ROOM':
      return {
        ...state,
        rooms: [...state.rooms, action.newRoom]
      }
    case 'DELETE_ROOM':
      return {
        ...state,
        rooms: state.rooms.filter(({ id }) => id !== action.roomId)
      }
    default:
      return state
  }
}