import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
  links: [],
  deletingLink: false,
  linkDeleted: null,
  updatingLink: false,
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
    case Actions.ADD_LINK: {
      const { link } = action;
      return {
        ...state,
        links: [...state.links, link]
      };
    }
    case Actions.DELETING_LINK: {
      return {
        ...state,
        deletingLink: action.id
      };
    }
    case Actions.REMOVE_LINK: {
      const { id } = action;
      const newLinks = state.links.filter(link => link.id !== id);
      return {
        ...state,
        links: newLinks,
        deletingLink: false,
        linkDeleted: id
      };
    }
    case Actions.UPDATING_LINK: {
      return {
        ...state,
        updatingLink: action.id
      };
    }
    case Actions.UPDATE_LINK: {
      const newLinks = state.links.map(link => {
        if (action.link.id === link.id)
          link = { ...link, title: action.link.title };
        return link;
      });
      return {
        ...state,
        links: newLinks,
        updatingLink: false
      };
    }
    default: {
      return state;
    }
  }
};

export default profileReducer;
