import {getUserData} from "../auth/store/actions"
import * as Actions from "store/actions"
import * as rp from "request-promise"

export const ERROR   = "ERROR"
export const SUCCESS = "SUCCESS"


export async function simpleCall (method, endpoint, data, json) {
	
	try {
		var options = {
			method : method,
			uri    : "https://simple.beaux.media/v3.0/" + endpoint,
			headers: {"BA-Token": getUserData().baToken},
			json   : json || true// Automatically stringifies the body to JSON
		}
		
		switch (method) {
			case "post":
				options.body = data
				break
			default:
				options.qs = data
		}
		
		const request = await rp(options)
		
		return request
	}
	catch (error) {
		console.error(error)
		let errData = error.response.body
		let errMsg  = "Unknown Error"
		if (errData.error.message) {
			errMsg = errData.error.message
		}
		return errMsg
	}
	
}