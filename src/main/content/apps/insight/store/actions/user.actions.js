import axios from "axios/index";

export const GET_USER_DATA = "[PROFILES APP] GET USER DATA";

export function getUserData() {
  const request = axios.get("/api/profiles-app/user");

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_USER_DATA,
        payload: response.data
      })
    );
}
