import * as Actions from '../actions';
import moment from 'moment'

const initialState = {
  activityData: [],
  activityFetching: false,
  activityRateData: [],
  activityRateFetching: false,
  activityEngagementData: [],
  activityEngagementFetching: false,
  followersRateData: [],
  followersRateFetching: false,
  topHashtagsData: [],
  topHashtagsFetching: false,
  topLocationsData: [],
  topLocationsFetching: false,
  topMentionsData: [],
  topMentionsFetching: false,
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
    case Actions.GET_FOLLOWERS_RATE_INSIGHT: {
      return {
        ...state,
        followersRateData: action.payload,
        followersRateFetching: false
      };
    }
    case Actions.FOLLOWERS_RATE_FETCHING: {
      return {
        ...state,
        followersRateFetching: true
      };
    }
    case Actions.GET_TOP_HASHTAGS_INSIGHT: {
      return {
        ...state,
        topHashtagsData: action.payload,
        topHashtagsFetching: false
      };
    }
    case Actions.TOP_HASHTAGS_FETCHING: {
      return {
        ...state,
        topHashtagsFetching: true
      };
    }
    case Actions.GET_TOP_LOCATIONS_INSIGHT: {
      return {
        ...state,
        topLocationsData: action.payload,
        topLocationsFetching: false
      };
    }
    case Actions.TOP_LOCATIONS_FETCHING: {
      return {
        ...state,
        topLocationsFetching: true
      };
    }
    case Actions.GET_TOP_MENTIONS_INSIGHT: {
      return {
        ...state,
        topMentionsData: action.payload,
        topMentionsFetching: false
      };
    }
    case Actions.TOP_MENTIONS_FETCHING: {
      return {
        ...state,
        topMentionsFetching: true
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
