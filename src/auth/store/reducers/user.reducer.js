import * as Actions             from '../actions'
import {
    simpleStore,
    simpleCall
}                               from 'fn'
import {USER_BROWSER_REFERENCE} from '../actions/user.actions'

let initialState = {
    role: ['guest'],
    data: {
        'displayName': 'John Doe',
        'photoURL'   : 'assets/images/avatars/profile.jpg',
        'email'      : 'youfoundJohn@beaux.media',
        shortcuts    : []
    }

}

const user = function (state = initialState, action) {
    switch (action.type) {
        case Actions.SET_USER_DATA: {
            return action.payload
        }
        case Actions.REMOVE_USER_DATA: {
            return {
                ...initialState
            }
        }
        case Actions.USER_LOGGED_OUT: {
            return initialState
        }
        default: {
            return {...initialState, ...  simpleStore.lookup(USER_BROWSER_REFERENCE, 'local')} || state
        }
    }
}

export default user