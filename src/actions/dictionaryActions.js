import Axios from "axios";

import {
  GET_USER_PRODUCT_DETAILS,
  GET_COLORS,
  GET_ERRORS,
  FETCH_DRAFT_DICTIONARY_LIST
} from "./types";

//Fetching the user dictionary details
const headers = {
  "Content-Type": "application/json"
};

//Function to fetch the products belong to the user
export const fetchUserProductDetails = id => dispatch => {
  Axios.get(`http://localhost:3001/products/?userId=${id}`)
    .then(res => {
      dispatch({
        type: GET_USER_PRODUCT_DETAILS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

//Function to fetch the colors for domain and range
export const fetchColorsRange = () => dispatch => {
  Axios.get(`http://localhost:3001/colors`)
    .then(res => {
      dispatch({
        type: GET_COLORS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

//Fetching the current User dictionary list
export const fetchDraftDictionaryList = id => dispatch => {
  Axios.get(`http://localhost:3001/dictionary/?userId=${id}`)
    .then(res => {
      dispatch({
        type: FETCH_DRAFT_DICTIONARY_LIST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

//Function to update the dictionary list
export const updateDraftDictionaryList = data => dispatch => {
  Axios.put(`http://localhost:3001/dictionary/${data.id}`, data, {
    headers: headers
  })
    .then(res => {
      document.getElementById("modalCloseId").click();
      dispatch(fetchDraftDictionaryList(data.userId));
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

//Function to delete the dictionary list
export const deleteDraftDictionaryList = data => dispatch => {
  Axios.delete(`http://localhost:3001/dictionary/${data.id}`)
    .then(res => {
      dispatch(fetchDraftDictionaryList(data.userId));
    })
    .catch(err => {
      console.log("err", err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

//Function to create or update the dictionary
export const createOrUpdateDictionary = validateData => dispatch => {
  Axios.get(`http://localhost:3001/dictionary/?userId=${validateData.userId}`)
    .then(res => {
      let error = {};
      const dictionary = res.data;

      //for the first time
      if (dictionary.length > 1) {
        for (let i = 0; i < dictionary.length; i++) {
          if (
            dictionary[i].domain === validateData.domain &&
            dictionary[i].range === validateData.range
          ) {
            error = {
              message: "Duplicate - Duplicate Domain - Range pair",
              severity: "warning"
            };
          } else if (
            dictionary[i].domain === validateData.domain &&
            dictionary[i].range != validateData.range
          ) {
            error = {
              message: "Forks - Duplicate Domains with different Ranges",
              severity: "danger"
            };
          } else if (
            dictionary[i].domain === validateData.range &&
            dictionary[i].range === validateData.domain
          ) {
            error = {
              message: "Cycles - Domian and Ranges forming a cycle",
              severity: "danger"
            };
          } else if (
            dictionary[i].domain === validateData.range &&
            dictionary[i].range != validateData.domain
          ) {
            error = {
              message: "Chains - Domian and Ranges forming a chain",
              severity: "danger"
            };
          }
        }
        if (Object.keys(error).length > 1) {
          validateData["message"] = error.message;
          validateData["status"] = error.severity;
        } else {
          validateData["message"] = "Valid Dictionary";
          validateData["status"] = "valid";
        }
        if (validateData.userMode === "edit") {
          delete validateData.userMode;
          dispatch(updateDraftDictionaryList(validateData));
        } else {
          delete validateData.userMode;
          dispatch(createDictionary(validateData));
        }
      } else {
        validateData["message"] = "Valid Dictionary";
        validateData["status"] = "valid";
        if (validateData.userMode === "edit") {
          delete validateData.userMode;
          dispatch(updateDraftDictionaryList(validateData));
        } else {
          delete validateData.userMode;
          dispatch(createDictionary(validateData));
        }
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

//Create the dicitonary
export const createDictionary = data => dispatch => {
  Axios.post(`http://localhost:3001/dictionary`, data, {
    headers: headers
  })
    .then(res => {
      document.getElementById("modalCloseId").click();
      dispatch(fetchDraftDictionaryList(data.userId));
    })
    .catch(err => {
      console.log("ERROR", err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
