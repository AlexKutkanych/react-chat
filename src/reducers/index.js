const initState = {
  userName: '',
  user: {},
  rooms: [],
  currentRoom: {}
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { 
        ...state,
        user: action.user
      }
    case 'SET_CURRENT_USER_NAME':
      return { 
        ...state,
        userName: action.userName
      }
    case 'SET_CURRENT_ROOM':
      return {
        ...state,
        currentRoom: action.currentRoom
      }
    case 'SET_CURRENT_USER_ROOMS':
      return {
        ...state,
        rooms: action.rooms
      }
    default:
      return state
  }
}

export default rootReducer;