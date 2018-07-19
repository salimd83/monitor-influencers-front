import {
    getUserData,
    lockUser
}              from '../auth/store/actions'
import {
    asyncActionsError,
    asyncActionsStart,
    asyncActionsFinish
}              from '../main/content/features/async/asyncActions'
import * as rp from 'request-promise'
import _       from 'lodash'


import {
    hiUser
} from 'fn'

import * as Actions from 'store/actions'
import {
    LOGIN_ERROR,
    REQUEST_SUCCESS
}                   from '../auth/store/actions/login.actions'

export const ERROR         = 'ERROR'
export const SUCCESS       = 'SUCCESS'
export const ERROR_SESSION = 'ERROR_SESSION'

export async function simpleCallNative({method = 'get', endpoint, data, json, errorHandler = true, authenticatedCall = true, headers = []} = {}) {

    method = method.toLowerCase()

    if (authenticatedCall && _.isEmpty(hiUser().baToken)) {
        return Promise.reject('A user token is not available to complete the request.')
    }

    try {
        var options = {
            method: method,
            uri   : 'https://simple.beaux.media/v3.0/' + endpoint,
            json  : json || true // Automatically stringifies the body to JSON
        }

        options.headers = headers

        if (!_.isEmpty(hiUser()) && !_.isEmpty(hiUser().baToken)) {
            options.headers['BA-Token'] = hiUser().baToken
        }

        switch (method) {
            case 'post':
                options.body = data
                break
            case 'put':
                options.body = data
                break
            case 'delete':
                options.body = data
                break
            default:
                options.qs = data
        }

        const request = await rp(options)

        return request
    }
    catch (error) {
        if (typeof error.response != 'undefined') {
            let errData = error.response.body
            console.log(error)
            let errMsg = 'Unknown Error'
            if (errData.error.message) {
                errMsg = errData.error.message
            }

            /**
             * Handle invalid sessions.
             */
            if (error.response.statusCode === 402) {
                lockUser()
            }
        }

        if (errorHandler) {
            error.response = 'A unexpected error has occurred. A better message will be added later. '
        }

        return Promise.reject(error.response)
    }
}

export async function simpleCallWA(dispatch, method, endpoint, data, json, autoLoader = true, authenticatedCall = true) {
    try {
        dispatch(asyncActionsStart(autoLoader))
        const request = await simpleCallNative({
                                                   method           : method,
                                                   endpoint         : endpoint,
                                                   authenticatedCall: authenticatedCall,
                                                   data             : data,
                                                   json             : json,
                                                   errorHandler     : true
                                               })
        dispatch(asyncActionsFinish())
        return request
    }
    catch (error) {
        dispatch(asyncActionsFinish())
        dispatch(Actions.showMessage({
                                         message         : String(error),
                                         anchorOrigin    : {
                                             vertical  : 'bottom',
                                             horizontal: 'left'
                                         },
                                         autoHideDuration: 60000
                                     }))
        throw error
    }
}

export async function simpleCall(method = 'get', endpoint, data, json, errorHandler = true, ...restParams) {
    return simpleCallNative({
                                method           : method,
                                endpoint         : endpoint,
                                authenticatedCall: restParams.authenticatedCall,
                                data             : data,
                                json             : json,
                                errorHandler     : true,
                                headers          : restParams.headers
                            })
}
