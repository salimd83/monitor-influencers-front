import {combineReducers} from 'redux';
import contacts from './contacts.reducer';

const contactsAppReducers = combineReducers({
    contacts
});

export default contactsAppReducers;