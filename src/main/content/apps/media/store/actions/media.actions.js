import * as Fn from "fn/simpleCall.js";

export const SET_FILTERS = "[MEDIA APP] SET FILTERS";
export const SET_TAGS_FILTER = "[MEDIA APP] SET TAGS FILTER";
export const SET_TYPES_FILTER = "[MEDIA APP] SET TYPES FILTER";
export const GET_MEDIA = "[MEDIA APP] GET MEDIA";
export const GET_NEXT_PAGE = "[MEDIA APP] GET NEXT PAGE";
export const LOAD_POST = "[MEDIA APP] LOAD POST";
export const CLOSE_POST_DIALOG = "[MEDIA APP] CLOSE POST DIALOG";

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

export const getMedia = (since, until, profile, tags, types, page = null, loading = false) => {
  if (profile === "*") profile = "";
  if (tags === "*") tags = "";
  if (types === "*") types = "";
  return async dispatch => {
    try {
      const response = await Fn.simpleCallWA(
        dispatch,
        "get",
        "si/media",
        {
          page,
          profile_id: profile,
          since,
          until,
          tags,
          type: types
        },
        undefined,
        loading
      );

      var d = new Date();
      d.setHours(23, 59, 59, 0);
      const strd = d.toISOString();

      const media = await Promise.all(
        response.data.map(async post => {
          const engagment = await Fn.simpleCallWA(dispatch, "get", "si/insights/media_engagement", {
            media_id: post.id,
            since: "2018-01-01T00:00:00Z",
            until: strd
          });

          post["engagment"] = engagment.data;
          return post;
        })
      );

      if (page) {
        dispatch({
          type: GET_NEXT_PAGE,
          payload: media,
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

export const loadPost = postId => {
  return async dispatch => {
    const response = await Fn.simpleCallWA(dispatch, "get", `si/media/${postId}`);
    const { data } = response;
    data.senses = data.tags.filter(tag => tag.score.toFixed(1) < 1);
    data.mentions = data.tags.filter(tag => tag.score.toFixed(1) >= 1);

    var d = new Date();
    d.setHours(23, 59, 59, 0);
    const strd = d.toISOString();

    const engagment = await Fn.simpleCallWA(dispatch, "get", "si/insights/media_engagement", {
      media_id: data.id,
      since: "2018-01-01T00:00:00Z",
      until: strd
    });

    data.engagment = engagment.data;

    dispatch({
      type: LOAD_POST,
      open: true,
      post: data
    });
  };
};

export const closePostDialog = () => {
  return {
    type: CLOSE_POST_DIALOG,
    open: false
  };
};
