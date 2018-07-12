import { ASYNC_ACTION_ERROR, ASYNC_ACTION_FINISH, ASYNC_ACTION_START } from './asyncConstants';

export const asyncActionsStart = (autoLoader) => {
  return {
    type: ASYNC_ACTION_START,
    autoLoader
  }
}

export const asyncActionsFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH
  }
}

export const asyncActionsError = () => {
  return {
    type: ASYNC_ACTION_ERROR
  }
}