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
    hiUser,
    betterForEach
} from 'fn'

import * as Actions from 'store/actions'
import {
    LOGIN_ERROR,
    REQUEST_SUCCESS
}                   from '../auth/store/actions/login.actions'

export const ERROR         = 'ERROR'
export const SUCCESS       = 'SUCCESS'
export const ERROR_SESSION = 'ERROR_SESSION'


function flattenArr(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flattenArr.concat(Array.isArray(toFlatten) ? flattenArr(toFlatten) : toFlatten)
    }, [])
}

export async function simpleCallNative({
                                           method = 'get',
                                           endpoint,
                                           data,
                                           json,
                                           errorHandler = true,
                                           authenticatedCall = true,
                                           headers = []
                                       } = {}) {
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
    catch (err) {


        if (typeof err.response != 'undefined') {
            let errData = err.response.body


            /**
             * Handle invalid sessions.
             */
            if (err.response.statusCode === 401) {
                lockUser()
            }


            if (errorHandler) {

                if (errData.error) {
                    if (errData.error.message) {
                        err.response = errData.error.message
                    }
                    else {
                        if (typeof errData.error === 'array') {
                            errData.error = flattenArr(errData.error)
                        }

                        if (errData.error.length < 1) {
                            err.response = errData.error[0].message
                        }
                        else {

                            await betterForEach([errData.error], async function (item) {
                                err.response = ''
                                for (var k in item) {
                                    if (typeof item[k] !== 'function') {
                                        err.response += `${item[k]}.`
                                    }
                                }
                            })

                        }
                    }
                }
            }
        }

        if (err.code === 'ETIMEDOUT') {
            if (err.connect === true) {
                err.response = 'There was a problem connecting to server. Please check your network.'
            }
            else {
                err.response = `The service is taking longer than usual.`
            }
        }

        if (err.message) {
            err.response = err.message
        }

        return Promise.reject(err.response)
    }
}

export async function simpleCallWA(
    dispatch,
    method,
    endpoint,
    data,
    json,
    autoLoader        = true,
    authenticatedCall = true
) {
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
        console.error('simpleCallWA ERROR', error)
        dispatch(asyncActionsFinish())
        dispatch(
            Actions.showMessage({
                message         : String(error),
                anchorOrigin    : {
                    vertical  : 'bottom',
                    horizontal: 'left'
                },
                autoHideDuration: 60000
            })
        )
        throw error
    }
}

export async function simpleCall(
    method       = 'get',
    endpoint,
    data,
    json,
    errorHandler = true,
    ...restParams
) {
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
