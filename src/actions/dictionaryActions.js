import Axios from "axios";

import {
  GET_USER_PRODUCT_DETAILS,
  GET_COLORS,
  GET_ERRORS,
  CREATE_DICTIONARY,
  FETCH_DRAFT_DICTIONARY_LIST,
  SAVE_DICTIONARY_ERRORS,
  SAVE_DICTIONARY_SUCCESS
} from "./types";

//Fetching the user dictionary details
const headers = {
  "Content-Type": "application/json"
};

export const fetchUserProductDetails = id => dispatch => {
  console.log("IDD", id);
  Axios.get(`http://localhost:3001/products/?userId=${id}`)
    .then(res => {
      console.log("RESPOSN", res);
      dispatch({
        type: GET_USER_PRODUCT_DETAILS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const fetchColorsRange = () => dispatch => {
  Axios.get(`http://localhost:3001/colors`)
    .then(res => {
      dispatch({
        type: GET_COLORS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const saveDictionary = data => dispatch => {
  Axios.post(`http://localhost:3001/dictionary`, data, {
    headers: headers
  })
    .then(res => {
      dispatch({
        type: CREATE_DICTIONARY,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("errr", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const fetchUserDictionaryDetails = id => dispatch => {
  Axios.get(`http://localhost:3001/dictionary/?userId=${id}`)
    .then(res => {
      dispatch({
        type: GET_USER_DICTIONARY_DETAILS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const createOrUpdateDraftDictionary = validateData => dispatch => {
  Axios.get(`http://localhost:3001/dictionary/?userId=${validateData.userId}`)
    .then(res => {
      console.log("RESPONSE", res);
      console.log("validateData", validateData);
      let error = {};
      const dictionary = res.data;
      for (let i = 0; i < dictionary.length; i++) {
        if (
          dictionary[i].domain === validateData.domain &&
          dictionary[i].range === validateData.range
        ) {
          error = {
            message: "Duplicate Domain - Range pair",
            severity: "warning"
          };
        } else if (
          dictionary[i].domain === validateData.domain &&
          dictionary[i].range != validateData.range
        ) {
          error = {
            message: "Duplicate Domains with different Ranges",
            severity: "danger"
          };
        } else if (
          dictionary[i].domain === validateData.range &&
          dictionary[i].range === validateData.domain
        ) {
          error = {
            message: "Domian and Ranges forming a cycle",
            severity: "danger"
          };
        } else if (
          dictionary[i].domain === validateData.range &&
          dictionary[i].range != validateData.domain
        ) {
          error = {
            message: "Domian and Ranges forming a chain",
            severity: "danger"
          };
        }
      }
      console.log("ERROR", error);
      if (Object.keys(error).length > 1) {
        validateData["message"] = error.message;
        validateData["status"] = error.severity;
        validateData["mode"] = "draft";
      } else {
        validateData["message"] = "";
        validateData["status"] = "valid";
        validateData["mode"] = "draft";
      }
      if (validateData.userMode === "edit") {
        delete validateData.userMode;
        dispatch(updateDraftDictionaryList(validateData));
      } else {
        delete validateData.userMode;
        Axios.post(`http://localhost:3001/dictionary`, validateData, {
          headers: headers
        })
          .then(res => {
            document.getElementById("modalCloseId").click();
            dispatch(fetchDraftDictionaryList(validateData.userId));
          })
          .catch(err => {
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            });
          });
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

export const fetchDraftDictionaryList = id => dispatch => {
  Axios.get(`http://localhost:3001/dictionary/?userId=${id}`)
    .then(res => {
      console.log("DICTIONARY LIT", res);
      dispatch({
        type: FETCH_DRAFT_DICTIONARY_LIST,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("err", err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

//============================================

export const updateDraftDictionaryList = data => dispatch => {
  console.log("UPDATED", data);
  Axios.put(`http://localhost:3001/dictionary/${data.id}`, data, {
    headers: headers
  })
    .then(res => {
      console.log("SOS");
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

export const deleteDraftDictionaryList = data => dispatch => {
  Axios.delete(`http://localhost:3001/dictionary/${data.id}`)
    .then(res => {
      dispatch(fetchDraftDictionaryList(data.userId));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const createFinalDictionary = data => dispatch => {
  Axios.post(`http://localhost:3001/dictionary`, data, {
    headers: headers
  })
    .then(res => {
      fetchDraftDictionaryList(data.userId);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};
export const finalDictionaryCreation = userId => dispatch => {
  Axios.get(`http://localhost:3001/dictionary/?userId=${userId}`)
    .then(res => {
      const draftData = res.data;
      let error = {};
      for (let i = 0; i < draftData.length; i++) {
        if (draftData[i].status === "danger") {
          error = {
            status: "danger",
            message: "Cannot Create dictionary with high severity"
          };
        } else {
          let updateData = draftData[i];
          updateData["mode"] = "active";
          dispatch(updateDraftDictionaryList(updateData));
          let dictionaryData = {
            domain: updateData.domain,
            range: updateData.range,
            userId: updateData.userId
          };
          dispatch(createFinalDictionary(dictionaryData));
        }
      }

      if (Object.keys(error).length > 0) {
        dispatch({
          type: SAVE_DICTIONARY_ERRORS,
          payload: error
        });
      } else {
        dispatch({
          type: SAVE_DICTIONARY_SUCCESS,
          payload: { message: "All dictionary Saved Successfully " }
        });
      }
    })
    .catch(err => {
      console.log("err", err);
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
};

export const createOrUpdateDictionary = validateData => dispatch => {
  Axios.get(`http://localhost:3001/dictionary/?userId=${validateData.userId}`)
    .then(res => {
      console.log("RESPONSE", res);
      console.log("validateData", validateData);
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
        console.log("ERROR", error);
        if (Object.keys(error).length > 1) {
          validateData["message"] = error.message;
          validateData["status"] = error.severity;
        } else {
          validateData["message"] = "Valid Dictionary";
          validateData["status"] = "valid";
        }
        console.log("VALIDDATEDATE", validateData);
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
