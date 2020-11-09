import React, { Component } from "react";
import { Key } from "react-feather";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Alert from "react-bootstrap/Alert"

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      newUsername: "",
      newPassword: "",
      existingUsername: "",
      existingPassword: "",
      errorMessage: "",
      logInErrorMessage: "",
      toUserPortal: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: "",
      logInMessage: "",
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.logInUser();
  };

  logInUser = () => {
    axios
      .post("/api/authorize", {
        username: this.state.existingUsername,
        password: this.state.existingPassword,
      })
      .then((res) => {
        localStorage.setItem("session_id", res.data.id);
        localStorage.setItem("user_id", res.data.userId);
        this.setState({
          toUserPortal: true,
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.title === "empty username") {
          this.setState({
            logInErrorMessage: "Please enter a username.",
          });
        }
        if (err.response.data.title === "empty password") {
          this.setState({
            logInErrorMessage: "Please enter a password.",
          });
        }
        if (err.response.data.title === "false username") {
          this.setState({
            logInErrorMessage:
              "The username you chose is already taken. Please try another entry.",
          });
        }
        if (err.response.data.title === "wrong credentials") {
          this.setState({
            logInErrorMessage: "Username or password combination is invalid.",
          });
        }
      });
  };

  logInErrorText = () => {
    if (this.state.logInErrorMessage === "") {
      return true;
    }
  };

  render() {
    console.log(this.state.loginErrorMessage)
    if (this.state.toUserPortal === true) return <Redirect to="/" />;

    return (
      <div className="container-fluid log-in-container">
        <header className="text-center log-in-header">
          <Key className="mx-auto d-block key-icon" />
          <h2 className="mt-2 log-in-text">Log in</h2>
        </header>
        <div className="row justify-content-center">
          <div className="col-5 input-col">
            <form onSubmit={this.handleSubmit}>
              <div class="form-group">
                <label className="label-text" for="">
                  User Id
                </label>
                <input
                  type="input"
                  className="form-control username-input"
                  onChange={this.handleChange}
                  placeholder=""
                  name="existingUsername"
                />
              </div>
              <div class="form-group">
                <label className="label-text" for="exampleFormControlInput1">
                  Password
                </label>
                <input
                  type="input"
                  className="form-control username-input"
                  onChange={this.handleChange}
                  placeholder=""
                  name="existingPassword"
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg mt-4 btn-block log-in-button"
              >
                Log in
              </button>
            </form>
          </div>
        <Alert />
        </div>
      </div>
    );
  }
}

export default LogIn;
