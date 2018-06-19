import * as Fn from 'fn/simpleCall.js';

export const GET_PROFILE = '[PROFILE APP] GET PROFILE';
export const OPEN_NEW_LINK_DIALOG = '[PROFILE APP] OPEN NEW LINK DIALOG';
export const CLOSE_NEW_LINK_DIALOG = '[PROFILE APP] CLOSE NEW LINK DIALOG';
export const OPEN_EDIT_LINK_DIALOG = '[PROFILE APP] OPEN EDIT LINK DIALOG';
export const CLOSE_EDIT_LINK_DIALOG = '[PROFILE APP] CLOSE EDIT LINK DIALOG';
export const ADD_LINK = '[PROFILE APP] ADD LINK';
export const REMOVE_LINK = '[PROFILE APP] REMOVE LINK';
export const UPDATE_LINK = '[PROFILE APP] UPDATE LINK';
export const DELETING_LINK = '[PROFILE APP] DELETING LINK';
export const UPDATING_LINK = '[PROFILE APP] UPDATING LINK';
export const ADD_TAG = '[PROFILE APP] ADD TAG';
export const DELETE_TAG = '[PROFILE APP] DELETE TAG';

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

export function addLink(link, profileId) {
  return async dispatch => {
    try {
      const response = await Fn.simpleCall(
        'post',
        `si/profile/${profileId}/links`,
        { ...link }
      );
      dispatch({
        type: ADD_LINK,
        link: response.data
      });
    } catch (e) {
      console.log(e.response);
    }
  };
}

function deletingLink(id) {
  return {
    type: DELETING_LINK,
    id
  };
}

export function removeLink(id) {
  return async dispatch => {
    dispatch(deletingLink(id));
    try {
      await Fn.simpleCall('delete', `si/link/${id}`);
      dispatch({
        type: REMOVE_LINK,
        id
      });
    } catch (e) {
      console.log(e.response);
    }
  };
}

function updatingLink(id) {
  return {
    type: UPDATING_LINK,
    id
  };
}

export function updateLink(link) {
  return async dispatch => {
    dispatch(updatingLink(link.id));
    try {
      const response = await Fn.simpleCall('put', `si/link/${link.id}`, {
        ...link
      });
      console.log('response.data', response.data);
      dispatch({
        type: UPDATE_LINK,
        link: link
      });
    } catch (e) {
      console.log(e.response);
    }
  };
}

export function addTag(tag, profileId) {
  console.log('action tag:', tag);
  return async dispatch => {
    try {
      const response = await Fn.simpleCall(
        'post',
        `si/profile/${profileId}/tags`,
        { tag_id: tag.id }
      );
      dispatch({
        type: ADD_TAG,
        tag: tag
      });
    } catch (e) {
      console.log(e.response);
    }
  };
}

export function deleteTag({ id, relation_id }, profileId) {
  console.log('action tag id', relation_id);
  return async dispatch => {
    try {
      const response = await Fn.simpleCall(
        'delete',
        `si/profile/${profileId}/tags`,
        { tag_id: id }
      );
      console.log(id);
      dispatch({
        type: DELETE_TAG,
        id
      });
    } catch (e) {
      console.log(e.response);
    }
  };
}
