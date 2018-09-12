import _ from "lodash";

let envJson = {};
try {
  envJson = require("../.env.json");
} catch (e) {
}

const defaultEnv = {
  commit: "NA",
  build: "NA",
  version: "NA",
  repo: {
    branch: "NA",
    tag: "NA"
  }
};

export const envDetails = { ...defaultEnv, ...envJson };

export function hiUser() {
  const hiUserStorage = JSON.parse(localStorage.getItem("hiUser"));
  
  const defaultUser = {
    baToken: "",
    baTokenReference: "NA",
    from: "internal",
    role: "guest",
    data: {
      displayName: "Not signed in.",
      photoURL: "assets/images/avatars/Abbott.jpg",
      email: "hello@beaux.media"
    }
  };

  //Short reference to BA-Token, used in Help Dialog
  if (!_.isEmpty(hiUserStorage) && !_.isEmpty(hiUserStorage.baToken)) {
    defaultUser.baTokenReference = hiUserStorage.baToken.slice(-8);
  }

  return { ...defaultUser, ...hiUserStorage };
}

//export const hiUser = {...defaultUser, ...hiUserStorage}

//console.log(`Hey Devs! You are running version ${envDetails.version} build ${envDetails.build}.`)

export async function healthCheck(dataArr, func, opts = []) {}
