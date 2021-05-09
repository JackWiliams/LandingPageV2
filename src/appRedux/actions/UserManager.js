import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
} from "../../constants/ActionTypes";

import { statusCode } from "../../constants/StatusCode";
import axios from "util/Api";

export const createUser = (username, email, password, callback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("users", {
        username: username,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data && res.data.code == statusCode.Success) {
          dispatch({ type: FETCH_SUCCESS });
          callback(res.data.code, res.data.data);
        } else {
          console.log("payload: data.error", res.data.error);
          dispatch({ type: FETCH_ERROR, payload: "Network Error" });
          callback(res.data.code, res.data.data);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
        callback(statusCode.ServerBusy, null);
      });
  };
};

export const getUserById = (id, callback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .get(`users/id?user_id=${id}`)
      .then((res) => {
        if (res.data && res.data.code == statusCode.Success) {
          dispatch({ type: FETCH_SUCCESS });
          callback(res.data.code, res.data.data);
        } else {
          console.log("payload: data.error", res.data.error);
          dispatch({ type: FETCH_ERROR, payload: "Network Error" });
          callback(res.data.code, res.data.data);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
        callback(statusCode.ServerBusy, null);
      });
  };
};

export const getAllUser = (username, page, size, callback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });

    axios
      .get(`users/all?username=${username}&page=${page}&size=${size}`)
      .then((res) => {
        if (res.data && res.data.code == statusCode.Success) {
          dispatch({ type: FETCH_SUCCESS });
          callback(res.data.code, res.data);
        } else {
          console.log("payload: data.error", res.data.error);
          dispatch({ type: FETCH_ERROR, payload: "Network Error" });
          callback(res.data.code, res.data);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
        callback(statusCode.ServerBusy, null);
      });
  };
};

export const deleteUserById = (id, callback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .delete(`users/id?user_id=${id}`)
      .then((res) => {
        if (res.data && res.data.code == statusCode.Success) {
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

export const updateUserById = (
  id,
  username,
  email,
  // password,
  callback = () => {}
) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .put("users/id", {
        _id: id,

        username: username,
        email: email,
        // password: password,
      })
      .then((res) => {
        if (res.data && res.data.code == statusCode.Success) {
          dispatch({ type: FETCH_SUCCESS });
          // localStorage.setItem("landing_id", res.data.data.landing_id);
          callback(res.data.code, res.data.data);
        } else {
          console.log("payload: data.error", res.data.error);
          dispatch({ type: FETCH_ERROR, payload: "Network Error" });
          callback(res.data.code, res.data.data);
        }
      })
      .catch(function (error) {
        dispatch({ type: FETCH_ERROR, payload: error.message });
        console.log("Error****:", error.message);
        callback(statusCode.ServerBusy, null);
      });
  };
};
