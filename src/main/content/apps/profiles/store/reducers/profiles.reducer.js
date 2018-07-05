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
  errors: [],
  profileDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: {}
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
        addedProfile: false,
        errors: []
      };
    }
    case Actions.ERROR_ADDING_PROFILE: {
      console.log('ERROR_ADDING_PROFILE');
      return {
        ...state,
        addingProfile: false,
        addedProfile: false,
        errors: []
      };
    }
    case Actions.ADD_PROFILE: {
      return {
        ...state,
        addingProfile: false,
        addedProfile: action.message,
        addedProfileId: action.id,
        errors: []
      };
    }
    case Actions.UPDATE_PROFILE: {
      const { profile, id } = action;
      const newProfile = { ...state.entities[id], ...profile };
      const newEntities = { ...state.entities };

      newEntities[action.id] = newProfile;

      return {
        ...state,
        entities: newEntities
      };
    }
    case Actions.RESET_ADD_PROFILE: {
      return {
        ...state,
        addingProfile: false,
        addedProfile: false,
        addedProfileId: '',
        errors: []
      };
    }
    case Actions.PROFILE_ERROR: {
      return {
        ...state,
        errors: action.errors
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
          data: {}
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
          data: {}
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
          data: {}
        }
      };
    }
    default: {
      return state;
    }
  }
};

export default profilesReducer;
