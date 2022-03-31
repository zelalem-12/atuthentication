import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import {
  LoadingBox,
  ErrorBox,
  FormInput,
  CustomButton,
} from "../../components";

import { register } from "../../store/actions";

import styles from "./style.module.css";

const RegisterPage = () => {
  const history = useHistory();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;
  if (success) history.push("/login");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      register(first_name, last_name, email, password, confirm_password)
    );
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className={styles.sign_up}>
      <span className={styles.span}>Create Account</span>
      <div className={styles.form}>
        {error && <ErrorBox message={error} />}
        {loading && <LoadingBox />}
        <FormInput
          type="text"
          name="first_name"
          value={first_name}
          handleChange={(e) => setFirstName(e.target.value)}
          label="First Name"
          required
        />
        <FormInput
          type="text"
          name="last_name"
          value={last_name}
          handleChange={(e) => setLastName(e.target.value)}
          label="Last Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          label="Password"
          required
        />
        <FormInput
          type="password"
          name="confirm_password"
          value={confirm_password}
          handleChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          required
        />
        <div className={styles.buttons}>
          <CustomButton clickHandele={handleSubmit} type="button">
            SIGN UP
          </CustomButton>
          <div className={styles.not_new_user}>
            <span>Already have account?</span>{" "}
            <Link className={styles.anchor_style} to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
