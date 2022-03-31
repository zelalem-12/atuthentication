import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import { userSigninReducer, userRegisterReducer } from "./reducers";

const rootReducer = combineReducers({
  loggedUser: userSigninReducer,
  userRegister: userRegisterReducer,
});

const initialState = {
  loggedUser: { user: null },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
