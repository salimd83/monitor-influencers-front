import axios from "axios/index"
import {auth} from "firebase-db"
import {setUserData} from "auth/store/actions/user.actions"
import * as Actions from "store/actions"
import * as rp from "request-promise"

export const LOGIN_ERROR   = "LOGIN_ERROR"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"


export function submitLogin ({username, password}) {
	
	
	return async (dispatch) => {
		try {
			var options = {
				method: "post",
				uri   : "https://simple.beaux.media/v3.0/account/auth",
				body  : {
					mobile  : username,
					passcode: password
				},
				json  : true // Automatically stringifies the body to JSON
			}
			
			const request = await rp(options)
			
			console.log("session token", request)
			const sessionToken = request.data.access_token
			const userProfile  = await rp({
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
			let errMsg  = "Unknown Error"
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

export function loginWithFireBase ({username, password}) {
	return (dispatch) =>
		auth.signInWithEmailAndPassword(username, password)
		    .then(() => {
			    return dispatch({
				                    type: LOGIN_SUCCESS
			                    })
		    })
		    .catch(error => {
			    const usernameErrorCodes = [
				    "auth/email-already-in-use",
				    "auth/invalid-email",
				    "auth/operation-not-allowed",
				    "auth/user-not-found",
				    "auth/user-disabled"
			    ]
			    const passwordErrorCodes = [
				    "auth/weak-password",
				    "auth/wrong-password"
			    ]
			
			    const response = {
				    username: usernameErrorCodes.includes(error.code) ? error.message : null,
				    password: passwordErrorCodes.includes(error.code) ? error.message : null
			    }
			
			    if (error.code === "auth/invalid-api-key") {
				    dispatch(Actions.showMessage({message: error.message}))
			    }
			
			    return dispatch({
				                    type   : LOGIN_ERROR,
				                    payload: response
			                    })
		    })
}