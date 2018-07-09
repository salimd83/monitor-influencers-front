import { getUserData, lockUser } from '../auth/store/actions';
import * as rp from 'request-promise';
import _ from 'lodash';

import * as Actions from 'store/actions';
import {
  LOGIN_ERROR,
  REQUEST_SUCCESS
} from '../auth/store/actions/login.actions';

export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';
export const ERROR_SESSION = 'ERROR_SESSION';

export async function simpleCall(
  method,
  endpoint,
  data,
  json,
  errorHandler = true
) {
  method = method.toLowerCase();

  try {
    var options = {
      method: method,
      uri: 'https://simple.beaux.media/v3.0/' + endpoint,
      json: json || true // Automatically stringifies the body to JSON
    };

    if (!_.isEmpty(getUserData())) {
      options.headers = { 'BA-Token': getUserData().baToken };
    }

    switch (method) {
      case 'post':
        options.body = data;
        break;
      case 'put':
        options.body = data;
        break;
      case 'delete':
        options.body = data;
        break;
      default:
        options.qs = data;
    }

    const request = await rp(options);

    return request;
  } catch (error) {
    let errData = error.response.body;
    let errMsg = 'Unknown Error';
    if (errData.error.message) {
      errMsg = errData.error.message;
    }

    /**
     * Handle invalid sessions.
     */
    if (error.response.statusCode === 402) {
      lockUser();
    }

    if (errorHandler) {
      error.response =
        'A unexpected error has occurred. A better message will be added later. ';
    }

    return Promise.reject(error.response);
  }
}

export async function simpleCallWA(dispatch, method, endpoint, data, json) {
  try {
    const request = await simpleCall(method, endpoint, data, json, true);
    // return dispatch({
    //                     type   : SUCCESS,
    //                     payload: request,
    //                     success: true
    //                 })
    return request;
  } catch (error) {
    dispatch(
      Actions.showMessage({
        message: error,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left'
        },
        autoHideDuration: 60000
      })
    );
    throw error
    // return dispatch({
    //                     type   : ERROR,
    //                     payload: error,
    //                     success: false
    //                 })
  }
}
