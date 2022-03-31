import React from "react";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./App.module.css";

import { PrivateRoute } from "./components";

import { Dashboard, LoginPage, RegisterPage, DefaultPage } from "./pages";

toast.configure();
const App = () => {
  return (
    <div className={styles.app_container}>
      <Switch>
        <PrivateRoute exact path="/" component={Dashboard} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={RegisterPage} />
        <Route component={DefaultPage} />
      </Switch>
    </div>
  );
};

export default App;
