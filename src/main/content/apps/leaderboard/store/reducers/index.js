import { combineReducers } from "redux";
import leaderboard from "./leaderboard.reducer";

const leaderboardAppReducers = combineReducers({
  leaderboard
});

export default leaderboardAppReducers;
