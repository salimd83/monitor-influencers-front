import * as Actions from '../actions';
import moment from 'moment'

const initialState = {
  activityData: [],
  activityFetching: false,
  activityRateData: [],
  activityRateFetching: false,
  activityEngagementData: [],
  activityEngagementFetching: false,
  from: moment().add(-1, 'months').toISOString(),
  to: moment().toISOString()
};

const insightReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_ACTIVITY_INSIGHT: {
      return {
        ...state,
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
        ...state,
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
    case Actions.GET_ACTIVITY_ENGAGEMENT_INSIGHT: {
      return {
        ...state,
        activityEngagementData: action.payload,
        activityEngagementFetching: false
      };
    }
    case Actions.ACTIVITY_ENGAGEMENT_FETCHING: {
      return {
        ...state,
        activityEngagementFetching: true
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
