import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;
    return Date.now() < JSON.parse(atob(token.split(".")[1])).exp * 1000;
  } catch (err) {
    return false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default PrivateRoute;
