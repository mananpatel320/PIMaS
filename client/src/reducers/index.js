import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import prReducer from './prReducer';

export default combineReducers({
  auth: authReducer,
  pr: prReducer,
  errors: errorReducer,
});
