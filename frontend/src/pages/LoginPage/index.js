import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import {
  LoadingBox,
  ErrorBox,
  FormInput,
  CustomButton,
} from "../../components";
import { signin } from "../../store/actions";
import { validPassword, validEmail } from "../util";

import styles from "./style.module.css";

const LoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispath = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validEmail(email)) toast.error("Please provide a valid email");
    else if (!validPassword(password))
      toast.error(
        '  "Password should 8 8 characters containing a lower case letter, an upper case letter, a number and one of these symbols (!@#$%^&*)."'
      );
    else {
      dispath(signin(email, password));
      setEmail("");
      setPassword("");
    }
  };
  const loggedUser = useSelector((state) => state.loggedUser);
  console.log(loggedUser);
  const { loading, user, error } = loggedUser;
  if (error) toast.error(error);
  if (user) history.push("/");

  // toast.success("Hello", options);
  // toast.info("World", options);
  // toast.warn(MyComponent, options);

  return (
    <div className={styles.signIn}>
      <span className={styles.span}>Login Form </span>
      {loading ? (
        <div className={styles.loadingBox}>
          <LoadingBox />
        </div>
      ) : (
        <div className={styles.form}>
          <FormInput
            name="email"
            type="email"
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            label="email"
          />
          <FormInput
            name="password"
            type="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
            label="password"
          />
          <div className={styles.buttons}>
            <CustomButton clickHandele={handleSubmit} type="button">
              Sign in
            </CustomButton>
            <div className={styles.new_user}>
              <span>Not Registered yet?</span>{" "}
              <Link className={styles.anchor_style} to="/signup">
                Create account
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
