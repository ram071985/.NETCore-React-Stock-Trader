import React, { Component } from "react";
import SplashImage from "../images/splashImage.jpeg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { User } from "react-feather";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      toUserPortal: false,
    };
  }

  handleLogInClick = () => {
    return (
      <Router>
        <Redirect
          to={{
            pathname: "/log-in",
          }}
        />
      </Router>
    );
  };

  handleSignUpClick = () => {
    return (
      <Router>
        <Redirect
          to={{
            pathname: "/sign-up",
          }}
        />
      </Router>
    );
  };

  render() {
    return (
      <div>
        <div className="container-fluid min-vh-100 d-flex flex-column">
          <div className="row flex-grow-1 landing-row">
            <div className="col-lg d-block mx-auto left-col">
              <h1 className="text-left welcome-text">
                Welcome to Trade<span className="topia-color">Topia</span>
              </h1>
              <h3 className="text-left second-description-text">
                A make believe stock trading resource.
              </h3>
              <h4 className="mb-5 text-left description-text">
                A fun and simple way to practice trading and selling from public
                companies: with no strings attached.
              </h4>
              <form className="form-inline my-2 my-lg-0">
                <Link to="/log-in">
                  <button
                    className="btn btn-outline-success my-2 my-sm-0 landing-page-buttons"
                    type="submit"
                  >
                    <User
                      className="ml-2 d-inline-block user-icon"
                      color="white"
                      width="15"
                      height="15"
                    />
                    <span className="log-in-button-text">Log in</span>
                  </button>
                </Link>
                <Link to="/sign-up">
                  <button
                    className="btn btn-outline-success mr-3 my-2 my-sm-0 landing-page-buttons"
                    type="submit"
                  >
                    <span className="account-button-text">
                      Start an account
                    </span>
                  </button>
                </Link>
              </form>
            </div>
            <div className="col-lg d-block mx-auto right-col">
              <img className="splash-image d-block mx-auto" src={SplashImage} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
