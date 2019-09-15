import { GET_ERRORS } from "../actions/types.js";

const initialState = {
  dictionaryErrors: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}
