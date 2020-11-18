import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components/Boards";
import "bootstrap/dist/css/bootstrap.min.css";
import UserHomepage from "./components/Homepage/UserHomepage";
import { Link, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/Login/Signup";
import authServcice from "./Services/auth.servcice";
import Story from "./components/Story";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Profile from "./components/Profile/profile";
import NotFound from "./components/Popups/NotFound";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authServcice.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      console.log(currentUser);
    }
  }, []);

  const logOut = () => {
    authServcice.logout();
    window.location.reload();
  };

  return (
    <Router>
      <div className="App">
        <Navbar bg="light" expand="lg" sticky="top">
          <div className="container">
            <Link to="/">
              <Navbar.Brand>Sprint Retro</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto ">
                {currentUser ? (
                  <>
                    <Link to="/profile" className="nav-link">
                      Profile
                    </Link>
                    <Link to="/" className="nav-link" onClick={logOut}>
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
        {/* <nav className="navbar navbar-expand-lg navbar-light navbar-static-top navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand" to={"/"}>
              Retro
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {currentUser ? (
                  <>
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        My Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/login" className="nav-link" onClick={logOut}>
                        LogOut
                      </a>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav> */}

        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />
          <Route
            exact
            path={`/profile`}
            component={currentUser ? Profile : Login}
          ></Route>

          <Route
            exact
            path="/"
            component={currentUser ? UserHomepage : Login}
          />
          <Route
            exact
            path="/boards"
            component={currentUser ? UserHomepage : Login}
          />
          <Route path="/boards/:id" component={currentUser ? Story : Login} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
