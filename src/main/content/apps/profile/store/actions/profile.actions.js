import * as Fn from 'fn/simpleCall.js';

export const GET_PROFILE = '[PROFILE APP] GET PROFILE';
export const OPEN_NEW_LINK_DIALOG = '[PROFILE APP] OPEN NEW LINK DIALOG';
export const CLOSE_NEW_LINK_DIALOG = '[PROFILE APP] CLOSE NEW LINK DIALOG';
export const OPEN_EDIT_LINK_DIALOG = '[PROFILE APP] OPEN EDIT LINK DIALOG';
export const CLOSE_EDIT_LINK_DIALOG = '[PROFILE APP] CLOSE EDIT LINK DIALOG';
export const ADD_LINK = '[PROFILE APP] ADD LINK';
export const REMOVE_LINK = '[PROFILE APP] REMOVE LINK';
export const UPDATE_LINK = '[PROFILE APP] UPDATE LINK';

export function getProfile(routeParams) {
  const request = Fn.simpleCall('get', `/si/profiles/${routeParams.id}`);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data[0],
        routeParams
      })
    );
}

export function openNewLinkDialog() {
  return {
    type: OPEN_NEW_LINK_DIALOG
  };
}

export function closeNewLinkDialog() {
  return {
    type: CLOSE_NEW_LINK_DIALOG
  };
}

export function openEditLinkDialog(data) {
  return {
    type: OPEN_EDIT_LINK_DIALOG,
    data
  };
}

export function closeEditLinkDialog() {
  return {
    type: CLOSE_EDIT_LINK_DIALOG
  };
}

export function addLink() {}
export function removeLink() {}
export function updateLink() {}
