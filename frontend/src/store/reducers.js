import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_RESULT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESULT,
  USER_DASHBOARD_REQUEST,
  USER_DASHBOARD_RESULT,
} from "./constants";

const userSigninReducer = (
  state = { loading: false, success: false, message: "" },
  action
) => {
  switch (action.type) {
    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true };
    case USER_SIGNIN_RESULT:
      return { ...state, loading: false, ...action };
    default:
      return state;
  }
};
const userRegisterReducer = (
  state = { loading: false, success: false, message: "" },
  action
) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_RESULT:
      return { ...state, loading: false, ...action };
    default:
      return state;
  }
};

const userDashboardReducer = (
  state = { loading: false, user: null },
  action
) => {
  switch (action.type) {
    case USER_DASHBOARD_REQUEST:
      return { ...state, loading: true };
    case USER_DASHBOARD_RESULT:
      return { ...state, loading: false, ...action };
    default:
      return state;
  }
};

export { userSigninReducer, userRegisterReducer, userDashboardReducer };
