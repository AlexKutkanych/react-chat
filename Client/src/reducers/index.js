import { combineReducers } from 'redux';
import roomsReducer from './roomsReducer';
import usersReducer from './usersReducer';

const appReducer = combineReducers({
  roomsReducer,
  usersReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = {}
  }

  return appReducer(state, action)
}

export default rootReducer;