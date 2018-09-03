import * as Actions from "../actions/report.actions";

let to = new Date();
to.setHours(0, 0, 0, 0);

let from = new Date();
from.setDate(from.getDate() - 30);
var fromStr = from.toISOString();

const initialState = {
  from: fromStr,
  to,
  profile: { label: "", value: "" },
  report: [],
  page: null,
  post: {},
  showPost: false
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_FILTERS:
      return {
        ...state,
        from: action.from,
        to: action.to,
        profile: action.profile
      };
    case Actions.LOAD_DEVICE:
      const devices = state.devices
      devices[action.index] = action.device
      return {
        ...state,
        devices,
        loadingDevice: false
      };
    case Actions.LOADNIG_DEVICE:
      return {
        ...state,
        loadingPost: true
      };
    default:
      return state;
  }
};

export default reportReducer;
