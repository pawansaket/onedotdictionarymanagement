import {
  GET_USER_PRODUCT_DETAILS,
  GET_COLORS,
  FETCH_DRAFT_DICTIONARY_LIST
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

    default:
      return false;
  }
}
