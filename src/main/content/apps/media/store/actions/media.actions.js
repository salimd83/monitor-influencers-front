import * as Fn from "fn/simpleCall.js";

export const SET_FILTERS = "[MEDIA APP] SET FILTERS";
export const SET_TAGS_FILTER = "[MEDIA APP] SET TAGS FILTER";
export const SET_TYPES_FILTER = "[MEDIA APP] SET TYPES FILTER";
export const GET_MEDIA = "[MEDIA APP] GET MEDIA";
export const GET_NEXT_PAGE = "[MEDIA APP] GET NEXT PAGE";

export const setFilters = (from, to, profile = {}) => {
  return {
    type: SET_FILTERS,
    from,
    to,
    profile
  };
};

export const setTagsFilter = tags => {
  return {
    type: SET_TAGS_FILTER,
    tags
  };
};

export const setTypesFilter = types => {
  return {
    type: SET_TYPES_FILTER,
    types
  };
};

export const getMedia = (since, until, profile, tags, types, page=null) => {
    if(profile === '*') profile = '';
    if(tags === '*') tags = '';
    console.log(since)
  return async dispatch => {
    try {
      const response = await Fn.simpleCallWA(dispatch, "get", "si/media", {
        page,
        profile_id: profile,
        since,
        until,
        tags,
        type: types
      }, undefined, false);

      if (page) {
        dispatch({
          type: GET_NEXT_PAGE,
          payload: response.data,
          page: response.metadata.paging.after
        });
      } else
        dispatch({
          type: GET_MEDIA,
          payload: response.data,
          page: response.metadata.paging.after
        });
    } catch (error) {
      console.log(error);
    }
  };
};
