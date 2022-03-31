import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { LoadingBox, FormInput, CustomButton } from "../../components";
import { signin } from "../../store/actions";
import { USER_SIGNIN_RESULT } from "../../store/constants";
import { validPassword, validEmail } from "../util";

import styles from "./style.module.css";

const LoginPage = () => {
  const dispath = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validEmail(email)) toast.error("Please provide a valid email");
    else if (!validPassword(password))
      toast.error(
        '  "Password should 8  characters containing a lower case letter, an upper case letter, a number and one of these symbols (!@#$%^&*)."'
      );
    else {
      dispath(signin(email, password));
      setEmail("");
      setPassword("");
    }
  };
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, success, message } = userLogin;

  useEffect(() => {
    if (!loading && !success && message) toast.error(message);
    if (success) {
      dispath({ type: USER_SIGNIN_RESULT, success: false, message: "" });
      history.push("/");
    }
  }, [loading, success, message]);

  // useEffect(() => {
  //   return () =>
  //     dispath({
  //       type: USER_SIGNIN_RESULT,
  //       success: false,
  //       message: "",
  //     });
  // });

  return (
    <div className={styles.signIn}>
      <span className={styles.span}>Login Form </span>
      {userLogin.loading ? (
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
