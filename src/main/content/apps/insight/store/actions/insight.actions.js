import * as Fn from 'fn/simpleCall.js';

export const GET_ACTIVITY_INSIGHT = '[INSIGHT APP] GET ACTIVITY INSIGHT';
export const ACTIVITY_FETCHING = '[INSIGHT APP] ACTIVITY_FETCHING';
export const SET_DATE = '[INSIGHT APP] SET_DATE';

export function getActivityData({ profileId, from, to }) {
  return async dispatch => {
    try {
      dispatch({
        type: ACTIVITY_FETCHING
      });
      const response = await Fn.simpleCall(
        'get',
        `/si/insights/activity_type?profile_id=42ig8yrfd5jhwrmy83&since=2018-05-30T00:00:00Z&until=2018-06-30T00:00:00Z`
      );
      console.log('response:', response.data);
      dispatch({
        type: GET_ACTIVITY_INSIGHT,
        payload: response.data
      });
    } catch (e) {
      console.log(e.response);
    }
  };
}

export function setDate(from, to) {
  return {
    type: SET_DATE,
    from,
    to
  };
}
