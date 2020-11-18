import React, { Component, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import authServcice from "../../Services/auth.servcice";

interface SignUpMessage {
  isSuccess: boolean;
  errorCode: number;
}

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerd, setRegistered] = useState(false);
  const [dob, setDob] = useState("");
  const [isValidDob, setIsValidDob] = useState(true);
  const [gender, setGender] = useState("Male");
  const [isDuplicate, setIsDuplicate] = useState(false);
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

  function checkValid(): boolean {
    // setIsValidName(true);
    // setIsValidEmail(true);
    // setIsValidDob(true);
    setRegistered(false);
    setIsDuplicate(false);
    setIsValidPassword(true);
    // if (fullName.trim() == "") setIsValidName(false);
    // if (email.trim() == "") setIsValidEmail(false);
    // if (dob.trim() == "") setIsValidDob(false);
    if (password.trim().length < 6) setIsValidPassword(false);
    return isValidPassword;
  }

  function getGenderValue(gender: string): number {
    if (gender === "Male") return 1;
    if (gender === "Female") return 0;
    return 0;
  }

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkValid() == false) {
      return;
    }
    setLoading(true);


    authServcice
      .register(fullName, email, password, dob, getGenderValue(gender))
      .then(
        (response) => {
          setLoading(false);

          if (response.data.isSuccess == false) {
            setIsDuplicate(true);
          } else {
            setRegistered(true);
          }
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
              required
              className="form-control"
              placeholder="Full name"
              onChange={onFullNameChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              required
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
              required
              className="form-control"
              placeholder="Enter password"
              onChange={onChangePassword}
            />
            {!isValidPassword && (
              <Form.Text className="text-danger">
                Password must have at least 6 digits
              </Form.Text>
            )}
          </div>

          <Form.Group controlId="dob">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              required
              name="dob"
              placeholder="Date of Birth"
              //  value={dob}
              onChange={(e) => {
                setDob(e.target.value);
                //  console.log(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formGridState">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              required
              //   defaultValue={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <option>Male</option>
              <option>Female</option>
            </Form.Control>
          </Form.Group>

          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Register
            {loading && (
              <span className="spinner-border spinner-border-sm mx-2 my-1"></span>
            )}
          </button>
          {isDuplicate && (
              <Alert variant="danger" className="mt-2">
              This email has been used
            </Alert>
          )}
          {registerd && (
            <Alert variant="success" className="mt-2">
              Save success
            </Alert>
          )}
          <p className="forgot-password text-right">
            Already registered <a href="/login">log in?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
