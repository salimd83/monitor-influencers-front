import { ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISH, ASYNC_ACTION_START } from './asyncConstants';

const initialState = {
  loading: false,
  autoLoader: false
};

const asyncReducer = (state = initialState, action) => {
  switch (action.type) {
    case ASYNC_ACTION_START:
      return { ...state, loading: true, autoLoader: action.autoLoader };
    case ASYNC_ACTION_FINISH:
      return { ...state, loading: false, autoLoader: false };
    case ASYNC_ACTION_ERROR:
      return { ...state, loading: false, autoLoader: false };
    default:
      return state;
  }
};

export default asyncReducer;