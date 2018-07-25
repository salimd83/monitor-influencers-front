import * as Actions from "../actions/media.actions";

const initialState = {
  from: '01-01-2007',
  to: '01-01-2008',
  profile: {}
};

const mediaReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SET_FILTERS:
            return {
                ...state,
                from: action.from,
                to: action.to,
                profile: action.profile
            }
        default:
            return state;
    }
}

export default mediaReducer;