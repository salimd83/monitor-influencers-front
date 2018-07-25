import * as Actions from '../actions/leaderboard.actions';

const initialState = {
    profiles: [],
    page: null,
    term: '',
    industry: '',
    fetching: false
}

const leaderBoardReducer = function(state = initialState, action) {
    switch (action.type) {
      case Actions.GET_LEADERS: {
        console.log(Object.assign({}, state.profiles))
        return {
          ...state,
          profiles: [...state.profiles, ...action.payload.profiles],
          page: action.payload.page
        };
      }
      case Actions.SET_TERM: {
        return {
          ...state,
          term: action.payload
        }
      }
      case Actions.SET_INDUSTRY: {
        return {
          ...state,
          industry: action.payload
        }
      }
      case Actions.START_FETCHING: {
        return {
          ...state,
          fetching: true
        }
      }
      case Actions.STOP_FETCHING: {
        return {
          ...state,
          fetching: false
        }
      }
      case Actions.ERROR_FETCHING: {
        return {
          ...state,
          fetching: false
        }
      }
      default:
        return state;
    }
}

export default leaderBoardReducer;