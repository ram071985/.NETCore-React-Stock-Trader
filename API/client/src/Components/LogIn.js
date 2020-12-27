import React, { Component } from "react";
import { Key } from "react-feather";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AlertComponent from "./AlertComponent";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Form } from "react-bootstrap";

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
      loading: false,
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
    this.setState({
      loading: true,
    });
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
          loading: false,
        });
      })
      .catch((err) => {
        if (err.response.data.detail === "empty username and password") {
          this.setState({
            logInErrorMessage: "Please enter a username and password.",
            setShow: true,
            loading: false,
          });
        }

        if (err.response.data.detail === "empty username") {
          this.setState({
            logInErrorMessage: "Please enter a username.",
            setShow: true,
            loading: false,
          });
        }

        if (err.response.data.detail === "empty password") {
          this.setState({
            logInErrorMessage: "Please enter a password.",
            setShow: true,
            loading: false,
          });
        }

        if (err.response.data.detail === "false username") {
          this.setState({
            logInErrorMessage:
              "The username you chose is already taken. Please try another entry.",
            setShow: true,
            loading: false,
          });
        }

        if (err.response.data.detail === "username doesn't exist") {
          this.setState({
            logInErrorMessage:
              "This username does not exist. Please enter an existing username.",
            setShow: true,
            loading: false,
          });
        }
        if (err.response.data.detail === "wrong credentials") {
          this.setState({
            logInErrorMessage: "Username or password combination is invalid.",
            setShow: true,
            loading: false,
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

    const { loading } = this.state;
    return (
      <Container
        id="login-container"
        className="container justify-content-center"
      >
        <Row id="login-title-row" className="justify-content-center">
          <Key className="mx-auto d-block key-icon" />
          <h3 className="mt-2 d-block log-in-text">Log in</h3>
        </Row>
        <Row className="justify-content-center">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label className="label-text">
                User Id
              </Form.Label>
              <Form.Control
                type="input"
                className="form-control username-input"
                onChange={this.handleChange}
                placeholder=""
                name="existingUsername"
              />
            </Form.Group>
            <div class="form-group">
              <label className="label-text" for="exampleFormControlInput1">
                Password
              </label>
              <input
                type="password"
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
          </Form>
        </Row>
        <div className="container-fluid">
          {loading ? (
            <div>
              <p className="mt-5 text-center">
                Logging in... Redirecting to User Portal.
              </p>{" "}
              <Spinner
                className="authenticate-spinner"
                animation="border"
                variant="secondary"
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {this.renderAlert()}
      </Container>
    );
  }
}

export default LogIn;
