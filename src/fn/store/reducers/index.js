import { combineReducers } from 'redux';
import request from './request.reducer';

const fnReducers = combineReducers({
  request
});

export default fnReducers;
