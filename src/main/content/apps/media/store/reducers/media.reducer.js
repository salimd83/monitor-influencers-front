import * as Actions from "../actions/media.actions";

const initialState = {
  from: '2018-03-26',
  to: '2018-07-26',
  profile: {label: '', value: ''},
  tags: [],
  types: [],
  media: [],
  page: null,
  post: {},
  showPost: false
};

const mediaReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SET_FILTERS:
            return {
                ...state,
                from: action.from,
                to: action.to,
                profile: action.profile
            }
        case Actions.SET_TAGS_FILTER:
            return {
                ...state,
                tags: [...state, ...action.tags]
            }
        case Actions.SET_TYPES_FILTER:
            return {
                ...state,
                types: [...state, ...action.types]
            }
        case Actions.GET_MEDIA:
            return {
                ...state,
                media: action.payload,
                page: action.page
            }
        case Actions.GET_NEXT_PAGE:
            return {
                ...state,
                media: [...state.media.filter(post => !action.payload.includes(post)), ...action.payload],
                page: action.page
            }
        case Actions.LOAD_POST:
            return {
                ...state,
                showPost: action.open,
                post: action.post
            }
        case Actions.CLOSE_POST_DIALOG:
            return {
                ...state,
                showPost: action.open
            }
        default:
            return state;
    }
}

export default mediaReducer;