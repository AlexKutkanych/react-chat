const initState = {
  userName: '',
  user: {}
}

export default (state = initState, action) => {
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
    default:
      return state
  }
}
