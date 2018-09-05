import * as Actions from "../actions/report.actions";

let to = new Date();
to.setHours(0, 0, 0, 0);

let from = new Date();
from.setDate(from.getDate() - 30);
var fromStr = from.toISOString();

const initialState = {
  from: fromStr,
  to,
  profiles: [
    {
      id: '111',
      name: "Ahmad Atye",
      image: 'https://material-ui.com/static/images/remy.jpg',
      totalFollowers: 2515,
      totalMedia: 54848,
      activityAndEngagement: 2584,
      followersRate: 2548,
      activityType: "80% Video - 20$ picture",
      topHashtag: "Bonita, color, Makeup",
      topMentions: "Zayona, Dubai, La Rambla",
      topLocation: "@samidubaiTv"
    },
    {
      id: "222",
      name: "Rouda Dahdouh",
      image: 'https://material-ui.com/static/images/remy.jpg',
      totalFollowers: 2515,
      totalMedia: 54848,
      activityAndEngagement: 2584,
      followersRate: 2548,
      activityType: "80% Video - 20$ picture",
      topHashtag: "Bonita, color, Makeup",
      topMentions: "Zayona, Dubai, La Rambla",
      topLocation: "@samidubaiTv"
    },
    {
      id: "333",
      name: "Karam Tmimo",
      image: 'https://material-ui.com/static/images/remy.jpg',
      totalFollowers: 2515,
      totalMedia: 54848,
      activityAndEngagement: 2584,
      followersRate: 2548,
      activityType: "80% Video - 20$ picture",
      topHashtag: "Bonita, color, Makeup",
      topMentions: "Zayona, Dubai, La Rambla",
      topLocation: "@samidubaiTv"
    },
    {
      id: "444",
      name: "Kojak Flonton",
      image: 'https://material-ui.com/static/images/remy.jpg',
      totalFollowers: 2515,
      totalMedia: 54848,
      activityAndEngagement: 2584,
      followersRate: 2548,
      activityType: "80% Video - 20$ picture",
      topHashtag: "Bonita, color, Makeup",
      topMentions: "Zayona, Dubai, La Rambla",
      topLocation: "@samidubaiTv"
    }
  ],
  loading: false
};

const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_DATE_FILTER:
      return {
        ...state,
        from: action.from,
        to: action.to
      };
    case Actions.ADD_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, action.profile],
      }
    case Actions.REMOVE_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles.filter(profile => profile.id != action.id)],
        loading: false
      }
    default:
      return state;
  }
};

export default reportReducer;
