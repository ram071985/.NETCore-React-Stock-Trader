import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { User } from "react-feather";

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      toUserPortal: false,
      logInClick: false,
      signUpClick: false,
      isLogIn: false,
      isSignUp: false,
      authType: "",
    };
  }

  handleClick = (e) => {
    if (e.target.textContent === "Start an account")
      this.setState({
        isSignUp: true,
      });

    this.setState({
      authType: e.target.textContent,
    });
  };

  render() {
    if (this.state.authType === "Log in") {
      return (
        <Redirect
          to={{
            pathname: "/log-in",
            state: {
              isLogIn: this.state.isLogIn,
            },
          }}
        />
      );
    }
    if (this.state.authType === "Start an account") {
      return (
        <Redirect
          to={{
            pathname: "/sign-up",
            state: {
              isSignUp: this.state.isSignUp,
            },
          }}
        />
      );
    }

    return (
      <div className="landing-container">
        <div className="container-fluid min-vh-100 d-flex flex-column landing-div">
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
                className="d-inline-block btn btn-success my-2 my-sm-0 landing-page-buttons"
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
                className="d-inline-block btn btn-success mr-3 my-2 my-sm-0 landing-page-buttons"
                onClick={(e) => this.handleClick(e)}
              >
                <span className="account-button-text">Start an account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
