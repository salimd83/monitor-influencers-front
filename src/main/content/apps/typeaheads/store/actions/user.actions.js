import * as Fn from 'fn/simpleCall.js';
export const GET_USER_DATA = '[TYPEAHEADS APP] GET USER DATA';

export function getUserData() {
  const request = Fn.simpleCall('get', 'typeahead');

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_USER_DATA,
        payload: response
      })
    );
}
