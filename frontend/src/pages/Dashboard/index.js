import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadingBox, CustomButton } from "../../components";

import { userDashboard } from "../../store/actions";
import styles from "./style.module.css";
import { USER_DASHBOARD_RESULT } from "../../store/constants";

const Dashboard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: USER_DASHBOARD_RESULT, user: null });
    history.push("/login");
  };

  const dashboardData = useSelector((state) => state.userDashboard);
  const { loading, user } = dashboardData;

  useEffect(() => {
    dispatch(userDashboard());
  }, []);
  const { firstName, lastName } = user || {};
  return (
    <div className={styles.dashboard}>
      {loading ? (
        <div className={styles.loadingBox}>
          <LoadingBox />
        </div>
      ) : (
        <>
          <h1 className={styles.title}>
            {" "}
            Hi, <strong>{[firstName, lastName].join(" ")}</strong> Welcome to
            your dashboard
          </h1>
          <CustomButton clickHandele={onLogout} type="button">
            logout
          </CustomButton>
        </>
      )}
    </div>
  );
};

export default Dashboard;
