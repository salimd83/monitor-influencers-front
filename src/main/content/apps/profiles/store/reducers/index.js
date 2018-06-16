import { combineReducers } from 'redux';
import profiles from './profiles.reducer';
import user from './user.reducer';

const profilesAppReducers = combineReducers({
  profiles,
  user
});

export default profilesAppReducers;
