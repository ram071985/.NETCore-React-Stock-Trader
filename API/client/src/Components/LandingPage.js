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
      logInClick: false,
      signUpClick: false,
      isLogIn: false,
      isSignUp: false,
    };
  }

  handleClick = (e) => {
    console.log(e.target.textContent);
    if (e.target.textContent) {
      return (
        <Redirect />
      )
    }

    return (
      <Redirect />
    )
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

              <button
                className="d-inline-block btn btn-outline-success my-2 my-sm-0 landing-page-buttons"
                onClick={(e) => this.handleClick(e)}
              >
                <User
                  className="ml-2 d-inline-block user-icon"
                  color="white"
                  width="15"
                  height="15"
                />
                <span className="log-in-button-text">Log in</span>
              </button>

              <button
                className="d-inline-block btn btn-outline-success mr-3 my-2 my-sm-0 landing-page-buttons"
                onClick={(e) => this.handleClick(e)}
              >
                <span className="account-button-text">Start an account</span>
              </button>
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
