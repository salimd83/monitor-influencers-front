import * as Actions from '../actions/leaderboard.actions';

const initialState = {
    profiles: []
}

const leaderBoardReducer = function(state = initialState, action) {
    switch (action.type) {
      case Actions.GET_PROFILES: {
        return {
          ...state,
          profiles: action.payload
        };
      }
      default:
        return state;
    }
}

export default leaderBoardReducer;