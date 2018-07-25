import ActivityTypeCard from "./InsightCards/ActivityTypeCard";
import ActivityRateCard from "./InsightCards/ActivityRateCard";
import FollowersRateCard from "./InsightCards/FollowersRateCard";
import TopHashtagsCard from "./InsightCards/TopHashtagsCard";
import TopLocationsCard from "./InsightCards/TopLocationsCard";
import TopMentionsCard from "./InsightCards/TopMentionsCard";

const cards = [
    {
      id: "ActivityRateCard",
      component: ActivityRateCard,
      w: 6,
      h: 4,
      minH: 4,
      minW: 4,
      x: 0,
      y: 0,
      hidden: true
    },
    {
      id: "FollowersRateCard",
      component: FollowersRateCard,
      w: 6,
      h: 4,
      minH: 4,
      minW: 4,
      x: 6,
      y: 0,
      hidden: true
    },
    {
      id: "ActivityTypeCard",
      component: ActivityTypeCard,
      w: 3,
      h: 4,
      minH: 4,
      minW: 2,
      x: 0,
      y: 1,
      hidden: true
    },
    {
      id: "TopHashtagsCard",
      component: TopHashtagsCard,
      w: 3,
      h: 5,
      minH: 4,
      minW: 1,
      x: 3,
      y: 1,
      hidden: true
    },
    {
      id: "TopLocationsCard",
      component: TopLocationsCard,
      w: 3,
      h: 5,
      minH: 4,
      minW: 1,
      x: 6,
      y: 1,
      hidden: true
    },
    {
      id: "TopMentionsCard",
      component: TopMentionsCard,
      w: 3,
      h: 5,
      minH: 4,
      minW: 1,
      x: 9,
      y: 1,
      hidden: true
    }
  ];

  export default cards;