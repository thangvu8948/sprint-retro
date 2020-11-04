import React, { Component, useState } from "react";
import authServcice from "../../Services/auth.servcice";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerd, setRegistered] = useState(false);
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fullName = e.target.value;
    setFullName(fullName);
  };

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    console.log(fullName);
    console.log(email);
    console.log(password);

    authServcice.register(fullName, email, password).then(
      (response) => {
        console.log(response);
        setLoading(false);
        setRegistered(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
      }
    );
  };

  return (
    <div className="outer">
      <div className="inner">
        <form onSubmit={handleSignUp}>
          <h3>Register</h3>
          <div className="form-group">
            <label>Full name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full name"
              onChange={onFullNameChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={onChangeEmail}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={onChangePassword}
            />
          </div>

          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Register
          </button>
          {registerd && <div>Đăng kí thành công</div>}
          <p className="forgot-password text-right">
            Already registered <a href="/sign-in">log in?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
