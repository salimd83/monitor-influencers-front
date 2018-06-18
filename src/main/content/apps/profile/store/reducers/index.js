import { combineReducers } from 'redux';
import profile from './profile.reducer';
import user from './user.reducer';

const profileAppReducers = combineReducers({
  profile,
  user
});

export default profileAppReducers;
