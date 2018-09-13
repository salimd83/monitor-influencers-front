import * as Fn from "fn/simpleCall.js";

export const SET_DATE_FILTER = "[REPORT APP] SET_DATE_FILTER";
export const ADD_PROFILE = "[REPORT APP] ADD_PROFILE";
export const CREATE_PROFILES = "[REPORT APP] CREATE_PROFILES";
export const REMOVE_PROFILE = "[REPORT APP] REMOVE_PROFILE";

export const setDateFilter = (from, to, ids) => {
  return dispatch => {
    dispatch({
      type: SET_DATE_FILTER,
      from,
      to
    });
    dispatch(getProfiles(ids, from, to));
  };
};

export const getProfiles = (ids, since, until) => {
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
          const metrics = await Fn.simpleCallWA(
            dispatch,
            "get",
            `si/insights/combined`,
            {
              profile_id: id,
              since,
              until
            },
            null,
            true,
            true,
            "3.0.1"
          );

          return createProfileData(profileDetails.data, metrics.data);
        })
      );
      dispatch({
        type: CREATE_PROFILES,
        profiles
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const createProfileData = (profile, metrics) => ({
  id: profile.id,
  name: `${profile.first_name} ${profile.last_name}`,
  image: profile.profile_picture,
  metrics: {
    total_activity: metrics.activity.total.toFixed(2) || "N/A",
    avgerage_activity: metrics.activity.average.toFixed(2) || "N/A",
    average_comments: metrics.engagement.average_comments.toFixed(2) || "N/A",
    average_reactions: metrics.engagement.average_reactions.toFixed(2) || "N/A",
    average_views: metrics.engagement.average_views.toFixed(2) || "N/A",
    total_views: metrics.engagement.total_views.toFixed(2) || "N/A",
    total_vomments: metrics.engagement.total_comments.toFixed(2) || "N/A",
    total_reactions: metrics.engagement.total_reactions.toFixed(2) || "N/A",
    total_brands: metrics.brands.total.toFixed(2) || "N/A",
    unique_brands: metrics.brands.unique.toFixed(2) || "N/A"
  }
});

export const addProfile = profile => {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      const profileDetails = await Fn.simpleCallWA(
        dispatch,
        "get",
        `si/profiles/${profile.id}`
      );
      const metrics = await Fn.simpleCallWA(
        dispatch,
        "get",
        `si/insights/combined`,
        {
          profile_id: profile.id,
          since: state.reportApp.from,
          until: state.reportApp.to
        },
        null,
        true,
        true,
        "3.0.1"
      );
      const tempProfileDetails = createProfileData(profileDetails.data, metrics.data);
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
