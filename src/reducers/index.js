import { combineReducers } from "redux";
import dictionaryReducer from "./dictionaryReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  dictionary: dictionaryReducer,
  auth: authReducer,
  errors: errorReducer
});
