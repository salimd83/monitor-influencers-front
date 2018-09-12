import * as Fn from "fn/simpleCall.js";

export const SET_DATE_FILTER = "[REPORT APP] SET_DATE_FILTER";
export const ADD_PROFILE = "[REPORT APP] ADD_PROFILE";
export const CREATE_PROFILES = "[REPORT APP] CREATE_PROFILES";
export const REMOVE_PROFILE = "[REPORT APP] REMOVE_PROFILE";

export const setDateFilter = (from, to) => {
  return {
    type: SET_DATE_FILTER,
    from,
    to
  };
};

export const getProfiles = ids => {
  return async dispatch => {
    try {
      const profiles = await Promise.all(
        ids.map(async id => {
          // await dispatch(addProfile({ id }));
          const profileDetails = await Fn.simpleCallWA(
            dispatch,
            "get",
            `si/profiles/${id}`
          );

          return createProfileData(profileDetails.data)
        })
      );
      dispatch({
        type: CREATE_PROFILES,
        profiles
      })
    } catch (error) {
      console.log(error);
    }
  };
};

const createProfileData = profile => ({
  id: profile.id,
  name: `${profile.first_name} ${profile.last_name}`,
  image: profile.profile_picture,
  totalFollowers: 2515,
  totalMedia: 54848,
  activityAndEngagement: 2584,
  followersRate: 2548,
  activityType: "80% Video - 20$ picture",
  topHashtag: "Bonita, color, Makeup",
  topMentions: "Zayona, Dubai, La Rambla",
  topLocation: "@samidubaiTv"
});

export const addProfile = profile => {
  return async dispatch => {
    try {
      const profileDetails = await Fn.simpleCallWA(
        dispatch,
        "get",
        `si/profiles/${profile.id}`
      );
      const tempProfileDetails = createProfileData(profileDetails.data);
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
