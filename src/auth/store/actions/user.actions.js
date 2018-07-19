import history               from 'history.js'
import {setDefaultSettings}  from 'store/actions/fuse'
import {FuseDefaultSettings} from '@fuse'
import _                     from 'lodash'
import {
    simpleStore,
    simpleCall
}                            from 'fn'


export const SET_USER_DATA          = '[USER] SET DATA'
export const REMOVE_USER_DATA       = '[USER] REMOVE DATA'
export const USER_LOGGED_OUT        = '[USER] LOGGED OUT'
export const USER_BROWSER_REFERENCE = 'hiUser'


export function setUserData(user, doNotUpdate) {
    return (dispatch) => {

        !doNotUpdate && user.role !== 'guest' && updateUserData(user)

        dispatch(setDefaultSettings(user.data.settings))

        dispatch({
                     type   : SET_USER_DATA,
                     payload: user
                 })
    }
}

export function updateUserSettings(settings) {
    const oldUser = getUserData()
    const user    = _.merge({}, oldUser, settings)
    const newData = updateUserData(user)
    return (dispatch, getState) => {
        return dispatch(newData)
    }
}


export function toggleInShortcuts(id) {
    return (dispatch, getState) => {
        let user      = getState().auth.user
        let shortcuts = user.data.shortcuts
        shortcuts     = shortcuts.includes(id) ? shortcuts.filter(_id => id !== _id) : [
            ...shortcuts,
            id
        ]
        return dispatch(setUserData({
                                        ...user,
                                        data: {
                                            ...user.data,
                                            shortcuts
                                        }
                                    }))
    }
}

export function removeUserData() {

    simpleStore.remove(USER_BROWSER_REFERENCE, 'local')
    return {
        type: REMOVE_USER_DATA
    }
}


export function lockUser() {
    if (_.isObject(getUserData())) {
        updateUserSettings({
                               locked : true,
                               role   : 'guest',
                               baToken: null
                           })

        history.push({
                         pathname: '/locked'
                     })
    }
    return (dispatch, getState) => {

        dispatch(setDefaultSettings(FuseDefaultSettings))

        dispatch({
                     type: USER_LOGGED_OUT
                 })
    }
}

export function logoutUser() {
    if (_.isObject(getUserData())) {
        simpleCall('delete', 'account/session')
        simpleStore.remove(USER_BROWSER_REFERENCE, 'local')
        simpleStore.remove('hiUsername', 'local')

        history.push({
                         pathname: '/'
                     })
    }
    return (dispatch, getState) => {

        dispatch(setDefaultSettings(FuseDefaultSettings))

        dispatch({
                     type: USER_LOGGED_OUT
                 })
    }
}

function updateUserData(user) {
    switch (user.from) {
        /*
         An example of how to handle data storage in case multiple provider are used for login
         case "firebase": {
         fireBaseUpdateUserData(user)
         break
         }*/
        default: {
            simpleStore.upsert(USER_BROWSER_REFERENCE, user, 'local')
        }
    }
}

export function getUserData() {

    return simpleStore.lookup(USER_BROWSER_REFERENCE, 'local')

}

