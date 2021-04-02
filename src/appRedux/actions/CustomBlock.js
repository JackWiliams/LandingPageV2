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

export const getAllCustomBlock = (page, size, callback = () => {}) => {
  return (dispatch) => {
    dispatch({ type: FETCH_START });

    axios
      .get(`custom-blocks/all?page=${page}&size=${size}`)
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
