import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { LoadingBox, FormInput, CustomButton } from "../../components";

import { register } from "../../store/actions";
import { USER_REGISTER_RESULT } from "../../store/constants";
import { validEmail, validPassword } from "../util";

import styles from "./style.module.css";

const RegisterPage = () => {
  const history = useHistory();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name) toast.error("Frist name is requred");
    else if (!last_name) toast.error("Last name is required");
    else if (!validEmail(email)) toast.error("Please provide a valid email");
    else if (!validPassword(password))
      toast.error(
        '  "Password should 8 8 characters containing a lower case letter, an upper case letter, a number and one of these symbols (!@#$%^&*)."'
      );
    else if (password !== confirm_password)
      toast.error("Password didn't match");
    else {
      dispatch(
        register(first_name, last_name, email, password, confirm_password)
      );
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, message } = userRegister;

  useEffect(() => {
    if (!loading && !success && message) toast.error(message);
    if (success) {
      dispatch({ type: USER_REGISTER_RESULT, success: false, message: "" });
      history.push("/login");
    }
  }, [loading, success, message]);

  // useEffect(() => {
  //   return () =>
  //     dispatch({
  //       type: USER_REGISTER_RESULT,
  //       success: false,
  //       message: "",
  //     });
  // });
  return (
    <div className={styles.sign_up}>
      <span className={styles.span}>Create Account</span>
      <div className={styles.form}>
        {loading ? (
          <LoadingBox />
        ) : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
