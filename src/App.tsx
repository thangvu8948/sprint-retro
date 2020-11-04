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
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top navbar-expand-lg">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
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
        </nav>


        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={SignUp} />

          <Route exact path="/" component={currentUser ? UserHomepage : Login} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
