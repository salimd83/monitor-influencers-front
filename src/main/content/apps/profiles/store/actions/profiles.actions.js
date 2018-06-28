import axios           from 'axios/index'
import { getUserData } from 'main/content/apps/profiles/store/actions/user.actions';
import * as Fn         from 'fn/simpleCall.js'
import _               from 'lodash'

export const GET_PROFILES                = '[PROFILES APP] GET PROFILES'
export const SET_SEARCH_TEXT             = '[PROFILES APP] SET SEARCH TEXT'
export const TOGGLE_IN_SELECTED_PROFILES =
  '[PROFILES APP] TOGGLE IN SELECTED PROFILES';
export const SELECT_ALL_PROFILES         = '[PROFILES APP] SELECT ALL PROFILES'
export const DESELECT_ALL_PROFILES       = '[PROFILES APP] DESELECT ALL PROFILES'
export const OPEN_NEW_PROFILE_DIALOG     = '[PROFILES APP] OPEN NEW PROFILE DIALOG'
export const CLOSE_NEW_PROFILE_DIALOG    =
  '[PROFILES APP] CLOSE NEW PROFILE DIALOG';
export const OPEN_EDIT_PROFILE_DIALOG    =
  '[PROFILES APP] OPEN EDIT PROFILE DIALOG';
export const CLOSE_EDIT_PROFILE_DIALOG   =
  '[PROFILES APP] CLOSE EDIT PROFILE DIALOG';
export const ADD_PROFILE                 = '[PROFILES APP] ADD PROFILE';
export const ADDING_PROFILE              = '[PROFILES APP] ADDING PROFILE';
export const UPDATE_PROFILE              = '[PROFILES APP] UPDATE PROFILE';
export const REMOVE_PROFILE              = '[PROFILES APP] REMOVE PROFILE'
export const REMOVE_PROFILES             = '[PROFILES APP] REMOVE PROFILES'
export const TOGGLE_STARRED_PROFILE      = '[PROFILES APP] TOGGLE STARRED PROFILE'
export const TOGGLE_STARRED_PROFILES     = '[PROFILES APP] TOGGLE STARRED PROFILES'
export const SET_PROFILES_STARRED        = '[PROFILES APP] SET PROFILES STARRED '
export const RECIEVING_PROFILES          = '[PROFILES APP] RECIEVING PROFILES'
export const RESET_ADD_PROFILE           = '[PROFILES APP] RESET ADD PROFILE'
export const PROFILE_ERROR               = '[PROFILES APP] PROFILE ERROR'

function recievingProfiles() {
  return {
    type: RECIEVING_PROFILES
  };
}

export function getProfiles(routeParams) {
    const request = Fn.simpleCall('get', '/si/profiles?limit=100')

  return dispatch => {
    dispatch(recievingProfiles());
    request.then(response =>
      dispatch({
        type: GET_PROFILES,
        payload: response.data,
        routeParams
      })
    );
  };
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  };
}

export function toggleInSelectedProfiles(profileId) {
  return {
    type: TOGGLE_IN_SELECTED_PROFILES,
    profileId
  };
}

export function selectAllProfiles() {
  return {
    type: SELECT_ALL_PROFILES
  };
}

export function deSelectAllProfiles() {
  return {
    type: DESELECT_ALL_PROFILES
  };
}

export function openNewProfileDialog() {
  return {
    type: OPEN_NEW_PROFILE_DIALOG
  };
}

export function closeNewProfileDialog() {
  return {
    type: CLOSE_NEW_PROFILE_DIALOG
  };
}

export function openEditProfileDialog(data) {
  return {
    type: OPEN_EDIT_PROFILE_DIALOG,
    data
  };
}

export function closeEditProfileDialog() {
  return {
    type: CLOSE_EDIT_PROFILE_DIALOG
  };
}

export function resetAddProfile() {
  return {
    type: RESET_ADD_PROFILE
  };
}

export function addProfile(newProfile) {
  return (dispatch, getState) => {
    const { routeParams } = getState().profilesApp.profiles;

    const request = Fn.simpleCall('post', 'si/profiles', newProfile);

    // const request = new Promise((resolve, reject) => {
    //   setTimeout(
    //     () =>
    //       resolve({
    //         code: 200,
    //         data: { id: '42ig8yrfd5jhwrmy83' },
    //         message: 'the profile was successfully created'
    //       }),
    //     1000
    //   );
    // });

    dispatch({
      type: ADDING_PROFILE
    });

    return request.then(response => {
      console.log(response);
      Promise.all([
        dispatch({
          type: ADD_PROFILE,
          message: response.message,
          id: response.data.id
        })
      ]);
    });
  };
}

export function updateProfile({ id, ...profile }) {
    const filteredProfile = {}
    for (let key in profile) {
        if (profile[key] !== '') {
            filteredProfile[key] = profile[key]
        }
    }
    return async (dispatch, getState) => {
        // const { routeParams } = getState().profilesApp.profiles;
        const response = await Fn.simpleCall('put', `si/profiles/${id}`, filteredProfile)

        console.log('response', response)

        if (response.body) {
            const errors = Object.values(_.omit(response.body.error, ['code']))
                                 .map(er => er[0])
            dispatch({
                         type: PROFILE_ERROR,
                         errors
                     })
        }
        else {
            await Promise.all([
                                  dispatch({
                                               type: UPDATE_PROFILE,
                                               profile,
                                               id
                                           })
                              ])

            // dispatch(getProfiles(routeParams));
            dispatch({type: CLOSE_EDIT_PROFILE_DIALOG})
        }
  };
}

export function removeProfile(profileId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().profilesApp.profiles;

    const request = axios.post('/api/profiles-app/remove-profile', {
      profileId
    });

      return request
          .then(response => Promise.all([
                                            dispatch({
                                                         type: REMOVE_PROFILE
                                                     })
                                        ])
                                   .then(() => dispatch(getProfiles(routeParams))))
          .catch(e => {
              console.log('error:', e)
          })
  };
}

export function removeProfiles(profileIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().profilesApp.profiles;

    const request = axios.post('/api/profiles-app/remove-profiles', {
      profileIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_PROFILES
        }),
        dispatch({
          type: DESELECT_ALL_PROFILES
        })
      ]).then(() => dispatch(getProfiles(routeParams)))
    );
  };
}

export function toggleStarredProfile(profileId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().profilesApp.profiles;

    const request = axios.post('/api/profiles-app/toggle-starred-profile', {
      profileId
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_PROFILE
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getProfiles(routeParams)))
    );
  };
}

export function toggleStarredProfiles(profileIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().profilesApp.profiles;

    const request = axios.post('/api/profiles-app/toggle-starred-profiles', {
      profileIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_PROFILES
        }),
        dispatch({
          type: DESELECT_ALL_PROFILES
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getProfiles(routeParams)))
    );
  };
}

export function setProfilesStarred(profileIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().profilesApp.profiles;

    const request = axios.post('/api/profiles-app/set-profiles-starred', {
      profileIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_PROFILES_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_PROFILES
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getProfiles(routeParams)))
    );
  };
}

export function setProfilesUnstarred(profileIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().profilesApp.profiles;

    const request = axios.post('/api/profiles-app/set-profiles-unstarred', {
      profileIds
    });

    return request.then(response =>
      Promise.all([
        dispatch({
          type: SET_PROFILES_STARRED
        }),
        dispatch({
          type: DESELECT_ALL_PROFILES
        }),
        dispatch(getUserData())
      ]).then(() => dispatch(getProfiles(routeParams)))
    );
  };
}
