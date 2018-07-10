import * as Actions from '../actions';

const initialState = {
  entities: [],
  searchText: '',
  searchType: '',
  selectedTypeaheadIds: [],
  routeParams: {},
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
        entities: action.payload,
        routeParams: action.routeParams
      };
    }
    case Actions.ADD_TYPEAHEAD: {
      console.log('typeahead ADD action:', action.typeahead);

      return {
        ...state,
        entities: [Object.assign({}, action.typeahead), ...state.entities]
      };
    }
    // case Actions.ADD_TYPEAHEADS: {
    //   console.log('typeahead ADD action:', action.typeahead);
    //   return {
    //     ...state,
    //     entities: [action.typeahead, ...state.entities],
    //     routeParams: action.routeParams
    //   };
    // }
    case Actions.SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.searchText,
        searchType: action.searchType,
        entities: action.payload
      };
    }
    case Actions.TOGGLE_IN_SELECTED_TYPEAHEADS: {
      const typeaheadId = action.typeaheadId;

      let selectedTypeaheadIds = [...state.selectedTypeaheadIds];

      if (selectedTypeaheadIds.find(id => id === typeaheadId) !== undefined) {
        selectedTypeaheadIds = selectedTypeaheadIds.filter(
          id => id !== typeaheadId
        );
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
