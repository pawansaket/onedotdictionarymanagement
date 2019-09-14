import { AUTHENTICATE_USER, SET_CURRENT_USER } from "../actions/types.js";

const initialState = {
  user: [],
  isAuthenticate: false,
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        authentication: action.payload
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        authentication: action.payload,
        isAuhthenticated: action.payload.isAuhthenticated
      };

    default:
      return state;
  }
}
