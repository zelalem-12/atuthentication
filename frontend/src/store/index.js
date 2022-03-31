import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import {
  userSigninReducer,
  userRegisterReducer,
  userDashboardReducer,
} from "./reducers";

const rootReducer = combineReducers({
  userLogin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDashboard: userDashboardReducer,
});

const initialState = {
  state: {},
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
