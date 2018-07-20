import * as Fn from "fn/simpleCall.js";

export const GET_PROFILES = "[PROFILES APP] GET PROFILES";
export const SET_TERM = "[PROFILES APP] SET TERM";
export const SET_INDUSTRY = "[PROFILES APP] SET INDUSTRY";
export const START_FETCHING = "[PROFILES APP] START_FETCHING";
export const STOP_FETCHING = "[PROFILES APP] STOP_FETCHING";
export const ERROR_FETCHING = "[PROFILES APP] ERROR_FETCHING";

export function getProfiles(page = null, search = "", industry) {
  return async dispatch => {
    try {
      dispatch({ type: START_FETCHING });
      const response = await Fn.simpleCallWA(dispatch, "get", "/si/leaderboard", {
        page,
        search,
        industry: industry ? industry.value : null
      });
      const profiles = await Promise.all(
        response.data.map(async profile => {
          const details = await Fn.simpleCallWA(dispatch, "get", `si/profiles/${profile.id}`);
          profile["links"] = details.data.links;
          profile["tags"] = details.data.tags;
          return profile;
        })
      );
      dispatch({
        type: GET_PROFILES,
        payload: { profiles, page: response.paging.after }
      });
      dispatch({ type: STOP_FETCHING });
    } catch (error) {
      dispatch({ type: ERROR_FETCHING });
      console.log(error);
    }
  };
}

export function setTerm(term) {
  return {
    type: SET_TERM,
    payload: term
  };
}

export function setIndustry(industry) {
  console.log('industry', industry)
  return {
    type: SET_INDUSTRY,
    payload: industry
  };
}
