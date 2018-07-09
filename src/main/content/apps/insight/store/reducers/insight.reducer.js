import * as Actions from '../actions';
import { FuseUtils } from '@fuse'

const initialState = {
  activityData: [],
  activityFetching: false,
  activityRateData: [],
  activityRateFetching: false,
  from: FuseUtils.currentDateFormat(0, -1),
  to: FuseUtils.currentDateFormat()
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
    case Actions.GET_ACTIVITY_RATE_INSIGHT: {
      return {
        activityRateData: action.payload,
        activityRateFetching: false
      };
    }
    case Actions.ACTIVITY_RATE_FETCHING: {
      return {
        ...state,
        activityRateFetching: true
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
