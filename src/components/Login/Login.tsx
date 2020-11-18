import React, { Component, useEffect, useRef, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { Redirect, useHistory } from "react-router-dom";
import authServcice from "../../Services/auth.servcice";
import { History, LocationState } from "history";

export interface HistoryProps {
  history: History<LocationState>;
}

const Login = (props: HistoryProps) => {
  const form = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const validateAll = () => {
    return true;
  };

  useEffect(() => {
    if(authServcice.getCurrentUser() == null) {
      props.history.push("/");  
    }
  },[])

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);


    authServcice.login(email, password).then(
      (response) => {
        setLoading(false);
        props.history.push("/");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="outer">
      <div className="inner">
        <form onSubmit={handleLogin}>
          <h3>Log in</h3>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          {/* <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div> */}

          <button type="submit" className="btn btn-dark btn-lg btn-block">
            <span>Sign in</span>
            {loading && (
              <span className="spinner-border spinner-border-sm mx-2 my-1"></span>
            )}
          </button>

      
        </form>
      </div>
    </div>
  );
};

export default Login;
