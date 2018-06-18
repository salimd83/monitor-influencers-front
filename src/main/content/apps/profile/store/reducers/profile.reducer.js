import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
  links: [],
  profile: {},
  linkDialog: {
    type: '',
    props: {
      open: false
    },
    data: null
  },
  routeParams: ''
};

const profileReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_PROFILE: {
      const { links, ...profile } = action.payload;
      return {
        ...state,
        links: links,
        profile: profile,
        routeParams: action.routeParams
      };
    }
    case Actions.OPEN_NEW_LINK_DIALOG: {
      return {
        ...state,
        linkDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_LINK_DIALOG: {
      return {
        ...state,
        linkDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_LINK_DIALOG: {
      return {
        ...state,
        linkDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_LINK_DIALOG: {
      return {
        ...state,
        linkDialog: {
          type: 'edit',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default profileReducer;
