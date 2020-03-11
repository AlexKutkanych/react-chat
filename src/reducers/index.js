const initState = {
  user: '',
  rooms: []
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { 
        ...state,
        user: action.user
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