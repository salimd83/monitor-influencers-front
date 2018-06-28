import * as Fn from 'fn/simpleCall.js';

export const GET_ACTIVITY_INSIGHT = '[INSIGHT APP] GET ACTIVITY INSIGHT';
export const ACTIVITY_FETCHING = '[INSIGHT APP] ACTIVITY_FETCHING';
export const SET_DATE = '[INSIGHT APP] SET_DATE';

export function getActivityData(profileId, from, to) {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIVITY_FETCHING
      });
      const response = await Fn.simpleCall(
        'get',
        `/si/insights/activity_type?profile_id=${profileId}&since=${from}&until=${to}`
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

export function setDate(profileId, from, to, withData = true) {
  return async dispatch => {
    dispatch({
      type: SET_DATE,
      from,
      to
    });
    if (withData) dispatch(getActivityData(profileId, from, to));
  };
}
