import * as Fn from "fn/simpleCall.js";

export const GET_ACTIVITY_INSIGHT = "[INSIGHT APP] GET ACTIVITY INSIGHT";
export const GET_ACTIVITY_RATE_INSIGHT = "[INSIGHT APP] GET ACTIVITY RATE INSIGHT";
export const GET_ACTIVITY_ENGAGEMENT_INSIGHT = "[INSIGHT APP] GET ACTIVITY ENGAGEMENT INSIGHT";
export const GET_FOLLOWERS_RATE_INSIGHT = "[INSIGHT APP] GET FOLLOWERS RATE INSIGHT";
export const ACTIVITY_FETCHING = "[INSIGHT APP] ACTIVITY FETCHING";
export const ACTIVITY_RATE_FETCHING = "[INSIGHT APP] ACTIVITY RATE FETCHING";
export const ACTIVITY_ENGAGEMENT_FETCHING = "[INSIGHT APP] ACTIVITY ENGAGEMENT FETCHING";
export const FOLLOWERS_RATE_FETCHING = "[INSIGHT APP] FOLLOWERS RATE FETCHING";
export const SET_DATE = "[INSIGHT APP] SET_DATE";

export function getActivityData(profileId, from, to) {
  console.log("from", from);
  return async dispatch => {
    try {
      dispatch({ type: ACTIVITY_FETCHING });
      const response = await Fn.simpleCallWA(
        dispatch,
        "get",
        `si/insights/activity_type?profile_id=${profileId}&since=${from}&until=${to}`
      );
      dispatch({
        type: GET_ACTIVITY_INSIGHT,
        payload: response.data
      });
    } catch (e) {
      console.log(e.response);
    }
  };
}

export function getActivityRateData(profileId, from, to) {
  return async dispatch => {
    try {
      dispatch({ type: ACTIVITY_RATE_FETCHING });
      const response = await Fn.simpleCallWA(
        dispatch,
        "get",
        `si/insights/activity_rate?profile_id=${profileId}&since=${from}&until=${to}`
      );

      dispatch({
        type: GET_ACTIVITY_RATE_INSIGHT,
        payload: response.data
      });
    } catch (e) {
      console.log(e.response);
    }
  };
}

export function getActivityEngagementData(profileId, from, to) {
  return async dispatch => {
    try {
      dispatch({ type: ACTIVITY_ENGAGEMENT_FETCHING });
      const response = await Fn.simpleCallWA(
        dispatch,
        "get",
        `si/insights/engagement_rate?profile_id=${profileId}&since=${from}&until=${to}`
      );

      dispatch({
        type: GET_ACTIVITY_ENGAGEMENT_INSIGHT,
        payload: response.data
      });
    } catch (e) {
      console.log(e.response);
    }
  };
}

export function getFollowersRateData(profileId, from, to) {
  return async dispatch => {
    try {
      dispatch({ type: FOLLOWERS_RATE_FETCHING });
      const response = await Fn.simpleCallWA(dispatch, "get", "si/insights/followers_rate", {
        profile_id: profileId,
        since: from,
        until: to
      });
      dispatch({
        type: GET_FOLLOWERS_RATE_INSIGHT,
        payload: response.data
      })
    } catch (error) {
      console.log(error);
    }
  };
}

export function setDate(profileId, from, to, withData = true) {
  return async dispatch => {
    dispatch({
      type: SET_DATE,
      from,
      to
    });
    if (withData) {
      dispatch(getActivityData(profileId, from, to));
      dispatch(getActivityRateData(profileId, from, to));
      dispatch(getFollowersRateData(profileId, from, to));
      // dispatch(getActivityEngagementData(profileId, from, to))
    }
  };
}
