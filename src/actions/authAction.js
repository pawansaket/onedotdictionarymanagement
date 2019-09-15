import Axios from "axios";

import { AUTHENTICATE_USER, LOGOUT_USER } from "./types";

//Fetching the user dictionary details
const headers = {
  "Content-Type": "application/json"
};

export const login = data => dispatch => {
  Axios.get(`http://localhost:3001/users`)
    .then(res => {
      const users = res.data;
      let returnData = {};
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].email === data.email &&
          users[i].password === data.password
        ) {
          const token =
            "TOKEN" + Math.random((Math.random() * Math.random(3 * 3)) / 2);
          returnData = {
            isAuthenticated: true,
            user: users[i],
            message: "User Login successfull",
            token: token
          };
          localStorage.setItem("token", token);
          localStorage.setItem("userDetail", JSON.stringify(users[i]));
          break;
        } else {
          returnData = {
            isAuthenticated: false,
            user: [],
            message: "User Loggin failed!",
            token: ""
          };
        }
      }
      dispatch({
        type: AUTHENTICATE_USER,
        payload: returnData
      });
    })
    .catch(err => {
      console.log(err);
    });
};
