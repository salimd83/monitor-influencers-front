import * as Actions from '../actions';
import _ from 'lodash';

const initialState = {
  entities: [],
  searchText: '',
  selectedProfileIds: [],
  loadingProfiles: false,
  addingProfile: false,
  addedProfile: false,
  addedProfileId: '',
  routeParams: {},
  profileDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const profilesReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.RECIEVING_PROFILES: {
      return {
        ...state,
        loadingProfiles: true
      };
    }
    case Actions.GET_PROFILES: {
      return {
        ...state,
        entities: _.keyBy(action.payload, 'id'),
        routeParams: action.routeParams,
        loadingProfiles: false,
        addingProfile: false,
        addedProfile: false
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText
      };
    }
    case Actions.ADDING_PROFILE: {
      return {
        ...state,
        addingProfile: true,
        addedProfile: false
      };
    }
    case Actions.ADD_PROFILE: {
      return {
        ...state,
        addingProfile: false,
        addedProfile: action.message,
        addedProfileId: action.id
      };
    }
    case Actions.RESET_ADD_PROFILE: {
      return {
        ...state,
        addingProfile: false,
        addedProfile: false,
        addedProfileId: ''
      };
    }
    case Actions.TOGGLE_IN_SELECTED_PROFILES: {
      const profileId = action.profileId;

      let selectedProfileIds = [...state.selectedProfileIds];

      if (selectedProfileIds.find(id => id === profileId) !== undefined) {
        selectedProfileIds = selectedProfileIds.filter(id => id !== profileId);
      } else {
        selectedProfileIds = [...selectedProfileIds, profileId];
      }

      return {
        ...state,
        selectedProfileIds: selectedProfileIds
      };
    }
    case Actions.SELECT_ALL_PROFILES: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedProfileIds = arr.map(profile => profile.id);

      return {
        ...state,
        selectedProfileIds: selectedProfileIds
      };
    }
    case Actions.DESELECT_ALL_PROFILES: {
      return {
        ...state,
        selectedProfileIds: []
      };
    }
    case Actions.OPEN_NEW_PROFILE_DIALOG: {
      return {
        ...state,
        profileDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_PROFILE_DIALOG: {
      return {
        ...state,
        profileDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_PROFILE_DIALOG: {
      return {
        ...state,
        profileDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_PROFILE_DIALOG: {
      return {
        ...state,
        profileDialog: {
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

export default profilesReducer;
