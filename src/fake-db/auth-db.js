import mock from "./mock"
import _ from "lodash"
import axios from "axios"

let authDB1 = {
	users: {
		admin: {
			uuid    : "XgbuVEXBU5gtSKdbQRP1Zbbby1i1",
			from    : "custom-db",
			password: "admin",
			role    : "admin",
			data    : {
				"displayName": "Abbott Keitch",
				"photoURL"   : "assets/images/avatars/Abbott.jpg",
				"email"      : "abbott@withinpixels.com",
				settings     : {
					layout          : {
						style : "layout1",
						config: {
							scroll : "content",
							navbar : {
								display : true,
								folded  : true,
								position: "left"
							},
							toolbar: {
								display : true,
								style   : "fixed",
								position: "below"
							},
							footer : {
								display : true,
								style   : "fixed",
								position: "below"
							},
							mode   : "fullwidth"
						}
					},
					customScrollbars: true,
					theme           : {
						main   : "defaultDark",
						navbar : "defaultDark",
						toolbar: "defaultDark",
						footer : "defaultDark"
					}
				},
				shortcuts    : [
					"calendar",
					"mail",
					"contacts"
				]
			}
		},
		staff: {
			uuid    : "XgbuVEXBU6gtSKdbTYR1Zbbby1i3",
			from    : "custom-db",
			password: "staff",
			role    : "staff",
			data    : {
				"displayName": "Arnold Matlock",
				"photoURL"   : "assets/images/avatars/Arnold.jpg",
				"email"      : "arnold@withinpixels.com",
				settings     : {
					layout          : {
						style : "layout2",
						config: {
							mode   : "boxed",
							scroll : "content",
							navbar : {
								display: true
							},
							toolbar: {
								display : true,
								position: "below"
							},
							footer : {
								display: true,
								style  : "fixed"
							}
						}
					},
					customScrollbars: true,
					theme           : {
						main   : "greeny",
						navbar : "mainThemeDark",
						toolbar: "mainThemeDark",
						footer : "mainThemeDark"
					}
				},
				shortcuts    : [
					"calendar",
					"mail",
					"contacts",
					"analytics-dashboard"
				]
			}
		}
	}
}

mock.onGet("/api/auth")
    .reply(async (config) => {
	
	    const data                 = JSON.parse(config.data)
	    const {username, password} = data
	    try {
		    var axiosCall = await axios({
			                                method: "post",
			                                url   : "https://simple.beaux.media/v3.0/account/auth",
			                                data  : {
				                                mobile  : username,
				                                passcode: password
			                                }
		                                })
		
		    if (axiosCall.token) {
			    const res = {
				    uuid: "XgbuVEXBU5gtSKdbQRP1Zbbby1i1",
				    from: "custom-db",
				    role: "admin",
				    data: {
					    "displayName": "Abbott Keitch",
					    "photoURL"   : "assets/images/avatars/Abbott.jpg",
					    "email"      : "abbott@withinpixels.com"
				    }
			    }
			
			    delete res["password"]
			    return [200, res]
		    }
	    }
	    catch (err) {
		    const errData = err.response.data
		    let errMsg    = "Unknown Error"
		    if (errData.error.mobile) {
			    errMsg = errData.error.mobile[0]
		    } else if (errData.error.passcode) {
			    errMsg = errData.error.passcode[0]
			
		    }
		
		    return [200, {errMsg}]
		
	    }
	
	
    })
    
