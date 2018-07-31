import * as Fn from "fn/simpleCall.js";

export const GET_LEADERS = "[LEADERBOARD APP] GET LEADER";
export const SET_TERM = "[LEADERBOARD APP] SET TERM";
export const SET_INDUSTRY = "[LEADERBOARD APP] SET INDUSTRY";
export const START_FETCHING = "[LEADERBOARD APP] START_FETCHING";
export const STOP_FETCHING = "[LEADERBOARD APP] STOP_FETCHING";
export const ERROR_FETCHING = "[LEADERBOARD APP] ERROR_FETCHING";

export function getLeaders(page = null, search = "", industry, fresh=false) {
  return async dispatch => {
    try {
      dispatch({ type: START_FETCHING });
      const response = await Fn.simpleCallWA(dispatch, "get", "si/leaderboard", {
        page,
        search,
        industry: industry ? industry.value : null
      }, undefined, false);
      const profiles = await Promise.all(
        response.data.map(async profile => {
          const details = await Fn.simpleCallWA(dispatch, "get", `si/profiles/${profile.id}`, undefined, undefined, false);
          profile["links"] = details.data.links;
          profile["tags"] = details.data.tags;
          return profile;
        })
      );
      dispatch({
        type: GET_LEADERS,
        payload: { profiles, page: response.paging.after, fresh }
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
  return {
    type: SET_INDUSTRY,
    payload: industry
  };
}
