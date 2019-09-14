import {
  GET_USER_PRODUCT_DETAILS,
  GET_USER_DICTIONARY_DETAILS,
  GET_COLORS,
  FETCH_DRAFT_DICTIONARY_LIST,
  SAVE_DICTIONARY_SUCCESS
} from "../actions/types.js";

const initialState = {
  userProducts: [],
  userDictionary: [],
  draftDictionary: [],
  colors: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PRODUCT_DETAILS:
      return {
        ...state,
        userProducts: action.payload,
        ...state.userProduct
      };
    case GET_USER_DICTIONARY_DETAILS:
      return {
        ...state,
        userDictionary: action.payload
      };
    case GET_COLORS:
      return {
        ...state,
        colors: action.payload
      };
    case FETCH_DRAFT_DICTIONARY_LIST:
      return {
        ...state,
        draftDictionary: action.payload,
        ...state.draftDictionary
      };

    case SAVE_DICTIONARY_SUCCESS:
      return {
        ...state,
        dictionarySuccess: action.payload
      };
    default:
      return false;
  }
}
