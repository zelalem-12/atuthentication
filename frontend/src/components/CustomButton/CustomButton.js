import React from "react";

import styles from "./CustomButton.module.css";

const CustomButton = ({ children, clickHandele }) => (
  <button className={styles.custom_button} onClick={clickHandele}>
    {children}
  </button>
);

export default CustomButton;
