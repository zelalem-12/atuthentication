import { apiCall } from "../utils/apiCall";

import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_RESULT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESULT,
  USER_DASHBOARD_REQUEST,
  USER_DASHBOARD_RESULT,
} from "./constants";

const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });
    const result = await apiCall("auth/login", "POST", {
      email,
      password,
    });

    if (result.token) localStorage.setItem("token", result.token);

    dispatch({
      type: USER_SIGNIN_RESULT,
      success: result.success,
      message: result.message,
    });
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_RESULT,
      success: false,
      message: error.message,
    });
  }
};

const register =
  (first_name, last_name, email, password, confirm_password) =>
  async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const result = await apiCall("auth/signup", "POST", {
        firstName: first_name,
        lastName: last_name,
        email,
        password,
      });
      dispatch({
        type: USER_REGISTER_RESULT,
        success: result.success,
        message: result.message,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_RESULT,
        success: false,
        message: error.message,
      });
    }
  };

const userDashboard = () => async (dispatch) => {
  dispatch({ type: USER_DASHBOARD_REQUEST });
  try {
    const token = localStorage.getItem("token");
    const result = await apiCall("user_dashboard", "GET", undefined, token);
    dispatch({
      type: USER_DASHBOARD_RESULT,
      user: result,
    });
  } catch (error) {
    console.log({ error });
    dispatch({
      type: USER_DASHBOARD_RESULT,
      user: null,
    });
  }
};

export { signin, register, userDashboard };
