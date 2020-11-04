import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { Route } from "react-router";
import { Link } from "react-router-dom";
import App from "../../App";
import Login from "./Login";
import SignUp from "./Signup";
import { BrowserRouter as Router } from "react-router-dom";

function GuestPage() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top navbar-toggleable-sm">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              Retro
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>
                    Sign in
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default GuestPage;
