import * as Fn from "fn/simpleCall.js";

export const SET_FILTERS = "[MEDIA APP] SET FILTERS";

export const setFilters = (from, to, profile) => {
    return {
        from,
        to,
        profile
    }
}