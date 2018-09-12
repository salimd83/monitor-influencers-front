import * as Actions from "../actions/report.actions";

let to = new Date();
to.setHours(0, 0, 0, 0);

let from = new Date();
from.setDate(from.getDate() - 30);
var fromStr = from.toISOString();

const initialState = {
  from: fromStr,
  to,
  profiles: [],
  loading: false
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_DATE_FILTER:
      return {
        ...state,
        from: action.from,
        to: action.to
      };
    case Actions.ADD_PROFILE:
      let profiles = [...state.profiles];
      if (!profiles.some(profile => profile.id === action.profile.id)) {
        profiles.push(action.profile);
      }
      return {
        ...state,
        profiles
      };
    case Actions.CREATE_PROFILES:
      return {
        ...state,
        profiles: action.profiles
      };
    case Actions.REMOVE_PROFILE:
      return {
        ...state,
        profiles: [
          ...state.profiles.filter(profile => profile.id != action.id)
        ],
        loading: false
      };
    default:
      return state;
  }
};

export default reportReducer;
