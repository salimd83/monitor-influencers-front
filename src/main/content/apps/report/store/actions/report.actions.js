import * as Fn from "fn/simpleCall.js";

export const SET_DATE_FILTER = "[REPORT APP] SET_DATE_FILTER";
export const ADD_PROFILE = "[REPORT APP] ADD_PROFILE";
export const REMOVE_PROFILE = "[REPORT APP] REMOVE_PROFILE";

export const setDateFilter = (from, to) => {
  return {
    type: SET_DATE_FILTER,
    from,
    to
  };
};

export const addProfile = profile => {
  return async dispatch => {
    try {
      const profileDetails = await Fn.simpleCallWA(
        dispatch,
        "get",
        `si/profiles/${profile.id}`
      );
      const tempProfileDetails = {
        id: profile.id,
        name: `${profileDetails.data.first_name} ${
          profileDetails.data.last_name
        }`,
        // image: profileDetails.profile_picture,
        image: 'https://material-ui.com/static/images/remy.jpg',
        totalFollowers: 2515,
        totalMedia: 54848,
        activityAndEngagement: 2584,
        followersRate: 2548,
        activityType: "80% Video - 20$ picture",
        topHashtag: "Bonita, color, Makeup",
        topMentions: "Zayona, Dubai, La Rambla",
        topLocation: "@samidubaiTv"
      };
      dispatch({
        type: ADD_PROFILE,
        profile: tempProfileDetails
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeProfile = id => {
  return {
    type: REMOVE_PROFILE,
    id
  };
};
