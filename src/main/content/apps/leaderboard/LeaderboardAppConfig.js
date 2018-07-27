import LeaderboardApp from "main/content/apps/leaderboard/LeaderboardApp";

export const LeaderboardAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "/mirrorr/leaderboard",
      component: LeaderboardApp
    }
  ]
};
