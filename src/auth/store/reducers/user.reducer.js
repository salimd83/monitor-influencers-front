import * as Actions from "../actions"

let initialState = {
	role: "guest",
	data: {
		"displayName": "John Doe",
		"photoURL"   : "assets/images/avatars/profile.jpg",
		"email"      : "youfoundJohn@beaux.media",
		shortcuts    : [
			"calendar",
			"mail",
			"contacts",
			"analytics-dashboard"
		]
	}
	
}

const user = function (state = initialState, action) {
	switch (action.type) {
		case Actions.SET_USER_DATA: {
			return {
				...initialState,
				...action.payload
			}
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
			return JSON.parse(localStorage.getItem(Actions.USER_BROWSER_REFERENCE)) || state
		}
	}
}

export default user