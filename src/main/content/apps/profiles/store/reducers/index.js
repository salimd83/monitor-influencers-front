import { combineReducers } from 'redux';
import profiles from './profiles.reducer';

const profilesAppReducers = combineReducers({
  profiles
});

export default profilesAppReducers;
