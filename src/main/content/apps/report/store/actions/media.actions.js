import * as Fn from "fn/simpleCall.js";

export const SET_FILTERS = "[REPORT APP] SET FILTERS";
export const SET_TAGS_FILTER = "[REPORT APP] SET TAGS FILTER";
export const SET_TYPES_FILTER = "[REPORT APP] SET TYPES FILTER";
export const GET_REPORT = "[REPORT APP] GET REPORT";
export const GET_NEXT_PAGE = "[REPORT APP] GET NEXT PAGE";
export const LOAD_POST = "[REPORT APP] LOAD POST";
export const CLOSE_POST_DIALOG = "[REPORT APP] CLOSE POST DIALOG";

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

export const getReport = (since, until, profile, tags, types, page = null, loading = false) => {
  if (profile === "*") profile = "";
  if (tags === "*") tags = "";
  if (types === "*") types = "";
  return async dispatch => {
    try {
      const response = await Fn.simpleCallWA(
        dispatch,
        "get",
        "si/report",
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

      const report = await Promise.all(
        response.data.map(async post => {
          const engagment = await Fn.simpleCallWA(dispatch, "get", "si/insights/report_engagement", {
            report_id: post.id,
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
          payload: report,
          page: response.metadata.paging.after
        });
      } else
        dispatch({
          type: GET_REPORT,
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
    const response = await Fn.simpleCallWA(dispatch, "get", `si/report/${postId}`);
    const { data } = response;
    data.senses = data.tags.filter(tag => tag.score.toFixed(1) < 1);
    data.mentions = data.tags.filter(tag => tag.score.toFixed(1) >= 1);

    var d = new Date();
    d.setHours(23, 59, 59, 0);
    const strd = d.toISOString();

    const engagment = await Fn.simpleCallWA(dispatch, "get", "si/insights/report_engagement", {
      report_id: data.id,
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
