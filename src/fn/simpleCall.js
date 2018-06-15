import {getUserData} from "../auth/store/actions"
import * as rp from "request-promise"
import _ from "lodash"

export const ERROR = "ERROR"
export const SUCCESS = "SUCCESS"


export async function simpleCall (method, endpoint, data, json) {
	
	method = method.toLowerCase();
	
	try {
		var options = {
			method: method,
			uri   : "https://simple.beaux.media/v3.0/" + endpoint,
			json  : json || true// Automatically stringifies the body to JSON
		}
		
		if (! _.isEmpty(getUserData())) {
			options.headers = {"BA-Token": getUserData().baToken}
			
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
		let errMsg = "Unknown Error"
		if (errData.error.message) {
			errMsg = errData.error.message
		}
		return errMsg
	}
	
}