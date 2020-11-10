import React, { Component } from "react";
import { BarChart } from "react-feather";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Form from "react-bootstrap/Form";
import AlertComponent from "./AlertComponent";

class SignUp extends Component {
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

  handleClose = () => {
    this.setState({
      setShow: false,
      logInErrorMessage: "",
    });
  };

  handleShow = () => {
    if (this.state.logInErrorMessage !== "") {
      this.setState({ setShow: true });
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: "",
      logInErrorMessage: "",
    });
  };

  handleNewUserSubmit = (e) => {
    e.preventDefault();
    this.postNewUser();
  };

  postNewUser = () => {
    axios
      .post("/api/register", {
        username: this.state.newUsername,
        password: this.state.newPassword,
      })
      .then((res) => {
        localStorage.setItem("session_id", res.data.id);
        localStorage.setItem("user_id", res.data.userId);
        this.setState({
          toUserPortal: true,
        });
      })
      .catch((err) => {
        if (err.response.data.detail === "empty username and password") {
          this.setState({
            logInErrorMessage: "Please enter a username and password.",
            setShow: true,
          });
        }
        console.log(this.state.logInErrorMessage)
        if (err.response.data.detail === "empty username") {
          this.setState({
            logInErrorMessage: "Please choose a username.",
            setShow: true,
          });
        }
        if (err.response.data.detail === "empty password") {
          this.setState({
            logInErrorMessage: "Please choose a password.",
            setShow: true,
          });
        }
        if (err.response.data.detail === "redundant username") {
          this.setState({
            logInErrorMessage:
              "The username you chose is already taken.  Please try another entry.",
            setShow: true,
          });
        }
      });
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
          <BarChart className="mx-auto d-block key-icon" />
          <h2 className="mt-2 log-in-text">Sign Up</h2>
        </header>
        <div className="row justify-content-center">
          <div className="col-5 input-col">
            <Form onSubmit={this.handleNewUserSubmit}>
              <div class="form-group">
                <label className="label-text" for="">
                  Choose Username
                </label>
                <input
                  type="input"
                  className="form-control username-input"
                  placeholder=""
                  name="newUsername"
                  onChange={this.handleChange}
                />
              </div>
              <div class="form-group">
                <label className="label-text" for="exampleFormControlInput1">
                  Choose Password
                </label>
                <input
                  type="password"
                  className="form-control username-input"
                  placeholder=""
                  name="newPassword"
                  onChange={this.handleChange}
                />
              </div>{" "}
              <button
                type="submit"
                className="btn btn-primary btn-lg mt-4 btn-block log-in-button"
              >
                Start trading now!
              </button>
            </Form>
          </div>
          {this.renderAlert()}
        </div>
      </div>
    );
  }
}

export default SignUp;
