import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
  SIGNOUT_USER_SUCCESS,
  USER_DATA,
  USER_TOKEN_SET,
} from "../../constants/ActionTypes";

import { statusCode } from "../../constants/StatusCode";
import axios from "util/Api";

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};

export const userSignUp = (
  { email, password, username },
  callback = () => {}
) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("auth/signup", {
        email: email,
        password: password,
        username: username,
      })
      .then((res) => {
        if (res.data && res.data.code == statusCode.Success) {
          // localStorage.setItem(
          //   "token",
          //   JSON.stringify(res.data.data.token.accessToken)
          // );
          // axios.defaults.headers.common["authorization"] =
          //   "Bearer " + res.data.data.accessToken;

          // dispatch({
          //   type: USER_TOKEN_SET,
          //   payload: res.data.data.accessToken,
          // });
          // dispatch({ type: USER_DATA, payload: res.data.data });
          dispatch({ type: FETCH_SUCCESS });
          callback(res.data.code);
        } else {
          console.log("payload: data.error", res.data.error);
          dispatch({ type: FETCH_ERROR, payload: "Network Error" });
          callback(res.data.code);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
        callback(statusCode.ServerBusy);
      });
  };
};

export const userSignIn = ({ username, password }, callback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("auth/signin", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data && res.data.code == statusCode.Success) {
          localStorage.setItem(
            "token",
            JSON.stringify(res.data.data.accessToken)
          );
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.data.accessToken;
          dispatch({ type: FETCH_SUCCESS });
          dispatch({
            type: USER_TOKEN_SET,
            payload: res.data.data.accessToken,
          });
          callback(res.data.code);
        } else {
          callback(res.data.code);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
        callback(statusCode.ServerBusy);
      });
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("auth/me")
      .then(({ data }) => {
        console.log("userSignIn: ", data);
        if (data.result) {
          dispatch({ type: FETCH_SUCCESS });
          dispatch({ type: USER_DATA, payload: data.user });
        } else {
          dispatch({ type: FETCH_ERROR, payload: data.error });
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
      });
  };
};

export const userSignOut = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({ type: FETCH_SUCCESS });
    dispatch({ type: SIGNOUT_USER_SUCCESS });
    // axios
    //   .post("auth/logout")
    //   .then(({ data }) => {
    //     console.log("log out", data);
    //     if (data.result) {
    //       localStorage.removeItem("token");
    //       dispatch({ type: FETCH_SUCCESS });
    //       dispatch({ type: SIGNOUT_USER_SUCCESS });
    //     } else {
    //       dispatch({ type: FETCH_ERROR, payload: data.error });
    //     }
    //   })
    //   .catch(function (error) {
    //     dispatch({ type: FETCH_ERROR, payload: error.message });
    //     console.log("Error****:", error.message);
    //   });
  };
};
