import * as Actions from '../actions';

const initialState = {
  activityData: [],
  activityFetching: false,
  from: null,
  to: null
};

const insightReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ACTIVITY_INSIGHT: {
      return {
        activityData: action.payload,
        activityFetching: false
      };
    }
    case Actions.ACTIVITY_FETCHING: {
      return {
        ...state,
        activityFetching: true
      };
    }
    case Actions.SET_DATE: {
      return {
        ...state,
        from: action.from,
        to: action.to
      };
    }
    default: {
      return state;
    }
  }
};

export default insightReducer;
