import {setUserData} from "auth/store/actions/user.actions"
import * as Actions from "store/actions"
import * as rp from "request-promise"
import * as Fn from "fn/index"

export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const REQUEST_SUCCESS = "REQUEST_SUCCESS"


export function submitLogin ({username, password}) {
	
	
	return async (dispatch) => {
		try {
			
			const request = await Fn.simpleCall("post", "account/auth", {
				mobile  : username,
				passcode: password
			})
			
			const sessionToken = request.data.access_token
			const userProfile = await rp({
				                             method : "get",
				                             uri    : "https://simple.beaux.media/v3.0/account",
				                             headers: {"BA-Token": sessionToken},
				                             json   : true // Automatically stringifies the body to JSON
			                             })
			
			
			const res = {
				baToken: sessionToken,
				from   : "api",
				role   : "admin",
				data   : {
					"displayName": userProfile.data.first_name + " " + userProfile.data.last_name,
					"photoURL"   : "assets/images/avatars/Abbott.jpg",
					"email"      : userProfile.data.email
				}
			}
			
			
			dispatch(setUserData(res))
			return dispatch({
				                type: LOGIN_SUCCESS
			                })
		}
		catch (error) {
			console.log(error)
			let errData = error.response.body
			let errMsg = "Unknown Error"
			if (errData.error.code) {
				if (errData.error.mobile) {
					errMsg = errData.error.mobile[0]
				} else if (errData.error.passcode) {
					errMsg = errData.error.passcode[0]
				} else if (errData.error.message) {
					errMsg = errData.error.message
				}
			}
			
			dispatch(Actions.showMessage({message: errMsg}))
			return dispatch({
				                type   : LOGIN_ERROR,
				                payload: errMsg
			                })
		}
	}
}

export function submitRequest ({username}) {
	
	
	return async (dispatch) => {
		try {
			
			const request = await Fn.simpleCall("post", "account/login", {
				mobile: username
			})
			dispatch(Actions.showMessage({message: request.message}))
			return dispatch({
				                type    : REQUEST_SUCCESS,
				                username: username,
				                success : true
			                })
		}
		catch (error) {
			console.log(error)
			let errData = error.response.body
			let errMsg = "Unknown Error"
			if (errData.error.code) {
				if (errData.error.mobile) {
					errMsg = errData.error.mobile[0]
				} else if (errData.error.passcode) {
					errMsg = errData.error.passcode[0]
				} else if (errData.error.message) {
					errMsg = errData.error.message
				}
			}
			
			dispatch(Actions.showMessage({message: errMsg}))
			return dispatch({
				                type   : LOGIN_ERROR,
				                payload: errMsg
			                })
		}
	}
}