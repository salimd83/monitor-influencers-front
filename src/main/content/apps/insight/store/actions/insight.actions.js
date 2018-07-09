import * as Fn from 'fn/simpleCall.js';

export const GET_ACTIVITY_INSIGHT = '[INSIGHT APP] GET ACTIVITY INSIGHT';
export const GET_ACTIVITY_RATE_INSIGHT = '[INSIGHT APP] GET ACTIVITY RATE INSIGHT';
export const ACTIVITY_FETCHING = '[INSIGHT APP] ACTIVITY FETCHING';
export const ACTIVITY_RATE_FETCHING = '[INSIGHT APP] ACTIVITY RATE FETCHING';
export const SET_DATE = '[INSIGHT APP] SET_DATE';

export function getActivityData(profileId, from, to) {
  return async dispatch => {
    try {
      dispatch({ type: ACTIVITY_FETCHING });
      const response = await Fn.simpleCallWA(
        dispatch,
        'get',
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
      // const response = await Fn.simpleCallWA(
      //   dispatch,
      //   'get',
      //   `si/insights/activity_rate?profile_id=${profileId}&since=${from}&until=${to}`
      // );
      const request = new Promise((resolve, reject) => {
        setTimeout(
          () =>
            resolve({
              code: 200,
              data: { id: '42ig8yrfd5jhwrmy83' },
              message: 'the profile was successfully created'
            }),
          1000
        );
      });
      const response = await request;
      
      dispatch({
        type: GET_ACTIVITY_RATE_INSIGHT,
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
