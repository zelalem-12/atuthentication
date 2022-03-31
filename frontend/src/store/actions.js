import axios from "axios";

import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "./constants";

const API = "http://localhost:5000/api";

const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });
    const result = await axios.post(API + "/auth/login", {
      email,
      password,
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

const register =
  (first_name, last_name, email, password, confirm_password) =>
  async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      if (password !== confirm_password) {
        dispatch({ type: USER_REGISTER_FAIL, payload: "Password Mismatch" });
      }
      const result = await axios.post(API + "/auth/signup", {
        firstName: first_name,
        lastName: last_name,
        email,
        password,
      });
      dispatch({ type: USER_REGISTER_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
  };

export { signin, register };
