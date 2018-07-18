import * as Fn from "fn/simpleCall.js";

export const GET_PROFILES = "[PROFILES APP] GET PROFILES";

export function getProfiles() {
  return async dispatch => {
    try {
      const response = await Fn.simpleCallWA(dispatch, "get", "/si/leaderboard");
      const profiles = await Promise.all(response.data.map(async profile => {
        const details = await Fn.simpleCallWA(dispatch, "get", `si/profiles/${profile.id}`);
        profile["links"] = details.data.links;
        profile["tags"] = details.data.tags;
        return profile;
      }));
      dispatch({
        type: GET_PROFILES,
        payload: profiles
      });
    } catch (error) {
      console.log(error);
    }
  };
}
