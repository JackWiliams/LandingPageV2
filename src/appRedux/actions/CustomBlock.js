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

export const getAllCustomBlock = (page, size, label, callback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });

    axios
      .get(`custom-blocks/all?page=${page}&size=${size}&label=${label}`)
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

export const createBlock = (
  block_name,
  label,
  category,
  imgSrc,
  html_components,
  callback = () => {}
) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .post("custom-blocks", {
        block_name: block_name,
        label: label,
        imgSrc: imgSrc,
        category: category,
        html_components: html_components,
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

export const deleteBlockById = (id, callback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .delete(`custom-blocks/id?block_id=${id}`)
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

export const updateBlockById = (
  id,
  block_name,
  label,
  category,
  imgSrc,
  html_components,
  callback = () => {}
) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });
    axios
      .put("custom-blocks/id", {
        _id: id,
        block_name: block_name,
        label: label,
        imgSrc: imgSrc,
        category: category,
        html_components: html_components,
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
