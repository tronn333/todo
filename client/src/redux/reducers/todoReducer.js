import { ALL_TODOS, LOGOUT_USER, LOGIN_USER } from '../types/index';

const todoReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        todos:[]
      }
    case ALL_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
