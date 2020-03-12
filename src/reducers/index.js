import { combineReducers } from 'redux';
import roomsReducer from './roomsReducer';
import usersReducer from './usersReducer';

export default combineReducers({
  roomsReducer,
  usersReducer
})