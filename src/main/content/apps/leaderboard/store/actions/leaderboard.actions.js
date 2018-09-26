import * as Fn from "fn/simpleCall.js";

export const GET_LEADERS = "[LEADERBOARD APP] GET LEADER";
export const SET_TERM = "[LEADERBOARD APP] SET TERM";
export const SET_GENDER = "[LEADERBOARD APP] SET GENDER";
export const SET_INDUSTRY = "[LEADERBOARD APP] SET INDUSTRY";
export const START_FETCHING = "[LEADERBOARD APP] START_FETCHING";
export const STOP_FETCHING = "[LEADERBOARD APP] STOP_FETCHING";
export const ERROR_FETCHING = "[LEADERBOARD APP] ERROR_FETCHING";
export const SELECT_ALL_LEADERBOARD = "[LEADERBOARD APP] SELECT_ALL_LEADERBOARD";
export const DESELECT_ALL_LEADERBOARD = "[LEADERBOARD APP] DESELECT_ALL_LEADERBOARD";
export const SET_LANGUAGE = "[LEADERBOARD APP] SET_LANGUAGE";
export const SET_TAGS = "[LEADERBOARD APP] SET_TAGS";

export function getLeaders(page = null, search = "", industry = null, language = null, tags=null, fresh = false) {
  console.log(tags)
  return async dispatch => {
    try {
      dispatch({ type: START_FETCHING });
      tags = language ? tags + ',' + language : tags
      if(tags) tags = tags.replace(/^,+|,+$/g, '')
      const response = await Fn.simpleCallWA(
        dispatch,
        "get",
        "si/leaderboard",
        {
          page,
          search,
          industry,
          tags
        },
        undefined,
        false
      );
      const profiles = await Promise.all(
        response.data.map(async profile => {
          const details = await Fn.simpleCallWA(
            dispatch,
            "get",
            `si/profiles/${profile.id}`,
            undefined,
            undefined,
            true
          );
          profile["links"] = details.data.links;
          profile["tags"] = details.data.tags;
          profile["category"] = details.data.category;
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

export function setGender(gender) {
  return {
    type: SET_GENDER,
    payload: gender
  };
}

export function setLanguage(language) {
  return {
    type: SET_LANGUAGE,
    payload: language
  };
}

export const setTags = tags => {
  return {
    type: SET_TAGS,
    tags
  };
};
