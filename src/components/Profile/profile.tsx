import React, { Component, useEffect, useRef, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { Redirect, useHistory } from "react-router-dom";
import authServcice from "../../Services/auth.servcice";
import { History, LocationState } from "history";
import {
  Form,
  Row,
  Col,
  Container,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { API_URL } from "../../app.const";

export interface IProfile {
  Id: string;
  Name: string;
  Gender: number;
  DOB: string;
  Email: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<IProfile>(null);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [isHandling, setIsHandling] = useState(false);
  const [isValidFullName, setIsValidFullName] = useState(true);
  const user = authServcice.getCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  async function updateInfo() {
    setIsSuccess(false);
    setFullName(fullName.trim());
    if(fullName.trim() === "") {
      setIsValidFullName(false);
      return;
    }
    setIsValidFullName(true);
    setIsHandling(true);
    //if (checkValid() == false) return;
    await fetch(`${API_URL}/account`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: user.token,
      },
      body: JSON.stringify({
        Name: fullName,
        Gender: getGenderValue(gender),
        DOB: dob,
      }),
    }).then((response) => {
      setIsHandling(false);
      setIsSuccess(true);
      // history.push(`/boards/${response.}`)
    });
  }

  async function fetchInfo() {
    setIsLoading(true);
    const res = await fetch(`${API_URL}/account`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: user.token,
      },
    });
    res
      .json()
      .then((res: IProfile) => {
        setProfile(res);
        setGender(mapGender(res.Gender));
        setFullName(res.Name);
        setDob(res.DOB);
        setIsLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  function getGenderValue(gender: string): number {
    if (gender === "Male") return 1;
    if (gender === "Female") return 0;
    return 0;
  }

  function mapGender(iGender: number): string {
    switch (iGender) {
      case 0:
        return "Female";
      case 1:
        return "Male";
      default:
        return "Other";
    }
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      {isLoading ? (
        <div
          style={{
            margin: "5%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Container className=" pt-3" style={{ textAlign: "left" }}>
          <h2>Edit Profile</h2>
          <hr></hr>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                readOnly
                placeholder="Enter email"
                value={profile.Email}
              />
              <Form.Text className="text-muted">
                You cannot change your email
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                placeholder="Full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
              />
               {!isValidFullName && <Form.Text className="text-danger">
                Please enter your full name
              </Form.Text>}
            </Form.Group>
            <Form.Group controlId="dob">
              <Form.Label>Select Date</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                  console.log(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formGridState">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                defaultValue={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  console.log(gender);
                }}
              >
                <option>Male</option>
                <option>Female</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" onClick={updateInfo}>
              Save Changes
              {isHandling && (
                <Spinner className=" ml-2 mb-1" animation="border" size="sm" />
              )}
            </Button>
          </Form>
          { isSuccess &&
            <Alert variant="success" className="mt-2">
              Save success
            </Alert>
          }
        </Container>
      )}
    </>
  );
};

export default Profile;
