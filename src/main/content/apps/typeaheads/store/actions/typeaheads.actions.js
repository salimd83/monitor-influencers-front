import axios from 'axios/index';
import { getUserData } from 'main/content/apps/typeaheads/store/actions/user.actions';
import * as Fn from 'fn/index';

export const GET_TYPEAHEADS = '[TYPEAHEADS APP] GET TYPEAHEADS';
export const SET_SEARCH_TEXT = '[TYPEAHEADS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_TYPEAHEADS = '[TYPEAHEADS APP] TOGGLE IN SELECTED TYPEAHEADS';
export const SELECT_ALL_TYPEAHEADS = '[TYPEAHEADS APP] SELECT ALL TYPEAHEADS';
export const DESELECT_ALL_TYPEAHEADS = '[TYPEAHEADS APP] DESELECT ALL TYPEAHEADS';
export const OPEN_NEW_TYPEAHEAD_DIALOG = '[TYPEAHEADS APP] OPEN NEW TYPEAHEAD DIALOG';
export const CLOSE_NEW_TYPEAHEAD_DIALOG = '[TYPEAHEADS APP] CLOSE NEW TYPEAHEAD DIALOG';
export const OPEN_EDIT_TYPEAHEAD_DIALOG = '[TYPEAHEADS APP] OPEN EDIT TYPEAHEAD DIALOG';
export const CLOSE_EDIT_TYPEAHEAD_DIALOG = '[TYPEAHEADS APP] CLOSE EDIT TYPEAHEAD DIALOG';
export const ADD_TYPEAHEAD = '[TYPEAHEADS APP] ADD TYPEAHEAD';
export const UPDATE_TYPEAHEAD = '[TYPEAHEADS APP] UPDATE TYPEAHEAD';
export const REMOVE_TYPEAHEAD = '[TYPEAHEADS APP] REMOVE TYPEAHEAD';
export const REMOVE_TYPEAHEADS = '[TYPEAHEADS APP] REMOVE TYPEAHEADS';
export const TOGGLE_STARRED_TYPEAHEAD = '[TYPEAHEADS APP] TOGGLE STARRED TYPEAHEAD';
export const TOGGLE_STARRED_TYPEAHEADS = '[TYPEAHEADS APP] TOGGLE STARRED TYPEAHEADS';
export const SET_TYPEAHEADS_STARRED = '[TYPEAHEADS APP] SET TYPEAHEADS STARRED ';
export const GET_TYPES = '[TYPEAHEADS APP] GET TYPES';

export function getTypeaheads(routeParams) {
  return dispatch => {
    const request = Fn.simpleCallWA(dispatch, 'get', 'typeahead/all');
    request.then(response =>
      dispatch({
        type: GET_TYPEAHEADS,
        payload: response.data,
        routeParams
      })
    );
  };
}

export function getTypes() {
  return async dispatch => {
    const response = await Fn.simpleCallWA(dispatch, 'get', 'typeahead/ta_type');
    dispatch({
      type: GET_TYPES,
      types: response.data
    });
  };
}

export function setSearchText(searchFields) {
  console.log('search:', searchFields);
  return dispatch => {
    const { searchText, searchType } = searchFields;
    const request = Fn.simpleCallWA(dispatch, 'get', `typeahead/${searchType}`, {
      q: searchText
    });
    request.then(response =>
      dispatch({
        type: GET_TYPEAHEADS,
        payload: response.data,
        searchText: searchFields
      })
    );
  };
}

export function toggleInSelectedTypeaheads(typeaheadId) {
  return {
    type: TOGGLE_IN_SELECTED_TYPEAHEADS,
    typeaheadId
  };
}

export function selectAllTypeaheads() {
  return {
    type: SELECT_ALL_TYPEAHEADS
  };
}

export function deSelectAllTypeaheads() {
  return {
    type: DESELECT_ALL_TYPEAHEADS
  };
}

export function openNewTypeaheadDialog() {
  return {
    type: OPEN_NEW_TYPEAHEAD_DIALOG
  };
}

export function closeNewTypeaheadDialog() {
  return {
    type: CLOSE_NEW_TYPEAHEAD_DIALOG
  };
}

export function openEditTypeaheadDialog(data) {
  return {
    type: OPEN_EDIT_TYPEAHEAD_DIALOG,
    data
  };
}

export function closeEditTypeaheadDialog() {
  return {
    type: CLOSE_EDIT_TYPEAHEAD_DIALOG
  };
}

export function addTypeahead(newTypeahead) {
  return async dispatch => {
    try {
      const response = await Fn.simpleCallWA(dispatch, 'post', 'typeahead', newTypeahead);

      dispatch({
        type: ADD_TYPEAHEAD,
        payload: response.data
      });
    } catch (e) {
      console.log('error: ', e.response);
    }
  };
}

export function updateTypeahead(typeahead) {
  return async dispatch => {
    try {
      const { id, ...rest } = typeahead;

      const response = await Fn.simpleCallWA(dispatch, 'put', `typeahead/${id}`, rest);

      dispatch({
        type: UPDATE_TYPEAHEAD,
        payload: response.data
      });
    } catch (e) {
      console.log('error: ', e.response);
    }
  };
}

export function removeTypeahead(typeaheadId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().typeaheadsApp.typeaheads;

    const request = Fn.simpleCallWA(dispatch, 'delete', '/api/typeaheads-app/remove-typeahead', {
      typeaheadId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_TYPEAHEAD
        })
      ]).then(() => dispatch(getTypeaheads(routeParams)))
    );
  };
}

export function removeTypeaheads(typeaheadIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().typeaheadsApp.typeaheads;

    const request = axios.post('/api/typeaheads-app/remove-typeaheads', {
      typeaheadIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_TYPEAHEADS
        }),
        dispatch({
          type: DESELECT_ALL_TYPEAHEADS
        })
      ]).then(() => dispatch(getTypeaheads(routeParams)))
    );
  };
}

export function toggleStarredTypeahead(typeaheadId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().typeaheadsApp.typeaheads;

    const request = axios.post('/api/typeaheads-app/toggle-starred-typeahead', {
      typeaheadId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_TYPEAHEAD
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getTypeaheads(routeParams)))
    );
  };
}

export function toggleStarredTypeaheads(typeaheadIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().typeaheadsApp.typeaheads;

    const request = axios.post('/api/typeaheads-app/toggle-starred-typeaheads', {
      typeaheadIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_TYPEAHEADS
        }),
        dispatch({
          type: DESELECT_ALL_TYPEAHEADS
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getTypeaheads(routeParams)))
    );
  };
}

export function setTypeaheadsStarred(typeaheadIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().typeaheadsApp.typeaheads;

    const request = axios.post('/api/typeaheads-app/set-typeaheads-starred', {
      typeaheadIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_TYPEAHEADS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_TYPEAHEADS
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getTypeaheads(routeParams)))
    );
  };
}

export function setTypeaheadsUnstarred(typeaheadIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().typeaheadsApp.typeaheads;

    const request = axios.post('/api/typeaheads-app/set-typeaheads-unstarred', {
      typeaheadIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_TYPEAHEADS_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_TYPEAHEADS
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getTypeaheads(routeParams)))
    );
  };
}
