import * as Actions from '../actions';

const initialState = {
  entities: [],
  searchText: '',
  searchType: '',
  selectedTypeaheadIds: [],
  types: [],
  deletingType: false,
  typeaheadDialog: {
    type: 'new',
    props: {
      open: false
    },
    data: null
  }
};

const typeaheadsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_TYPEAHEADS: {
      return {
        ...state,
        entities: action.payload.typeahead,
        searchType: action.payload.type,
        searchText: action.payload.term
      };
    }
    case Actions.GET_TYPES: {
      return {
        ...state,
        types: action.types
      };
    }
    case Actions.UPDATE_TYPEAHEAD: {
      const { payload } = action;
      return {
        ...state,
        entities: [payload, ...state.entities.filter(type => type.id !== payload.id)]
      };
    }
    case Actions.ADD_TYPEAHEAD: {
      return {
        ...state,
        entities: [action.payload, ...state.entities]
      };
    }
    case Actions.DELETING_TYPEAHEAD: {
      return {
        ...state,
        deletingType: true
      };
    }
    case Actions.DELETE_TYPEAHEAD: {
      return {
        ...state,
        entities: [...state.entities.filter(type => type.id !== action.id)],
        deletingType: false
      };
    }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.term,
      };
    }
    case Actions.TOGGLE_IN_SELECTED_TYPEAHEADS: {
      const typeaheadId = action.typeaheadId;

      let selectedTypeaheadIds = [...state.selectedTypeaheadIds];

      if (selectedTypeaheadIds.find(id => id === typeaheadId) !== undefined) {
        selectedTypeaheadIds = selectedTypeaheadIds.filter(id => id !== typeaheadId);
      } else {
        selectedTypeaheadIds = [...selectedTypeaheadIds, typeaheadId];
      }

      return {
        ...state,
        selectedTypeaheadIds: selectedTypeaheadIds
      };
    }
    case Actions.SELECT_ALL_TYPEAHEADS: {
      const arr = Object.keys(state.entities).map(k => state.entities[k]);

      const selectedTypeaheadIds = arr.map(typeahead => typeahead.id);

      return {
        ...state,
        selectedTypeaheadIds: selectedTypeaheadIds
      };
    }
    case Actions.DESELECT_ALL_TYPEAHEADS: {
      return {
        ...state,
        selectedTypeaheadIds: []
      };
    }
    case Actions.OPEN_NEW_TYPEAHEAD_DIALOG: {
      return {
        ...state,
        typeaheadDialog: {
          type: 'new',
          props: {
            open: true
          },
          data: null
        }
      };
    }
    case Actions.CLOSE_NEW_TYPEAHEAD_DIALOG: {
      return {
        ...state,
        typeaheadDialog: {
          type: 'new',
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_TYPEAHEAD_DIALOG: {
      return {
        ...state,
        typeaheadDialog: {
          type: 'edit',
          props: {
            open: true
          },
          data: action.data
        }
      };
    }
    case Actions.CLOSE_EDIT_TYPEAHEAD_DIALOG: {
      return {
        ...state,
        typeaheadDialog: {
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

export default typeaheadsReducer;
