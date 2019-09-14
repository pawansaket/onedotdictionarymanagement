import { GET_ERRORS, SAVE_DICTIONARY_ERRORS } from "../actions/types.js";

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
    case SAVE_DICTIONARY_ERRORS:
      return {
        ...state,
        dictionaryErrors: action.payload
      };
    default:
      return state;
  }
}
