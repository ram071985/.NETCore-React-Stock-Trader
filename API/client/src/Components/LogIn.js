import React, { Component } from "react";
import { Key } from "react-feather";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AlertComponent from "./AlertComponent";

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
      setShow: false,
    };
  }

  handleShow = () => {
    if (this.state.logInErrorMessage !== "") {
      this.setState({ setShow: true });
    }
  };

  handleClose = () => {
    this.setState({
      setShow: false,
      logInErrorMessage: "",
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: "",
      logInMessage: "",
      logInErrorMessage: "",
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
        console.log(err.response.data.detail === "empty username");

        if (err.response.data.detail === "empty username and password") {
          this.setState({
            logInErrorMessage: "Please enter a username and password.",
            setShow: true,
          });
        }

        if (err.response.data.detail === "empty username") {
          this.setState({
            logInErrorMessage: "Please enter a username.",
            setShow: true,
          });
        }

        if (err.response.data.detail === "empty password") {
          this.setState({
            logInErrorMessage: "Please enter a password.",
            setShow: true,
          });
        }
        console.log(this.state.logInErrorMessage);
        if (err.response.data.detail === "false username") {
          this.setState({
            logInErrorMessage:
              "The username you chose is already taken. Please try another entry.",
            setShow: true,
          });
        }

        if (err.response.data.detail === "username doesn't exist") {
          this.setState({
            logInErrorMessage:
              "This username does not exist. Please enter an existing username.",
            setShow: true,
          });
        }
        if (err.response.data.detail === "wrong credentials") {
          this.setState({
            logInErrorMessage: "Username or password combination is invalid.",
            setShow: true,
          });
        }
      });
  };

  logInErrorText = () => {
    if (this.state.logInErrorMessage === "") {
      return true;
    }
  };

  renderAlert = () => {
    if (this.state.logInErrorMessage !== "") {
      return (
        <AlertComponent
          setShow={this.state.setShow}
          handleClose={this.handleClose}
          logInErrorMessage={this.state.logInErrorMessage}
        />
      );
    }
  };

  render() {
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
          {this.renderAlert()}
        </div>
      </div>
    );
  }
}

export default LogIn;
