import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  INIT_URL,
} from "../../constants/ActionTypes";

import { statusCode } from "../../constants/StatusCode";
import axios from "util/Api";

export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url,
  };
};

export const createLandingPage = (
  landing_name,
  styles,
  callback = () => {}
) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("landing-pages", {
        landing_name: landing_name,
        created_date: null,
        created_by: localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")).username
          : null,
        styles: styles,
      })
      .then((res) => {
        if (res.data && res.data.code == statusCode.Success) {
          dispatch({ type: FETCH_SUCCESS });
          localStorage.setItem("landing_id", res.data.data.landing_id);
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

export const getLandingPageByID = (id, callback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .get(`landing-pages/id?landing_id=${id}`)
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

export const getAllLandingPage = (
  landing_name,
  page,
  size,
  callback = () => {}
) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    const username = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).username
      : "";
    axios
      .get(
        `landing-pages/all?landing_name=${landing_name}&username=${username}&page=${page}&size=${size}`
      )
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

export const deleteLandingPageByID = (id, callback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .delete(`landing-pages/id?landing_id=${id}`)
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
