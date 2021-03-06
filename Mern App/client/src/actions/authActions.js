import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

// Register User on the api at backend using the given data
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login to get  token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      
      setAuthToken(token);
      // then we docode the toekn to get current user
      const decoded = jwt_decode(token);
      
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// For logging out
export const logoutUser = () => dispatch => {
  
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  // removing authentication of current user
  dispatch(setCurrentUser({}));
};
