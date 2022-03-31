import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { CustomButton } from "../../components";
import styles from "./style.module.css";

const Dashboard = () => {
  const history = useHistory();

  const onLogout = () => {
    console.log("are h");
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}> Hi, Zelalem Welcome to your dashboard</h1>
      <CustomButton clickHandele={onLogout} type="button">
        logout
      </CustomButton>
    </div>
  );
};

export default withRouter(Dashboard);
