import React, { Component } from "react";
import { BarChart } from "react-feather";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AlertComponent from "./AlertComponent";
import { Container, Form, Spinner, Row, Button } from "react-bootstrap";
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
      loading: false,
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

  handleClick = async () => {
    const { history } = this.props;
    history.push("/log-in");
  };

  handleNewUserSubmit = (e) => {
    e.preventDefault();
    this.postNewUser();
  };

  postNewUser = () => {
    this.setState({
      loading: true,
    });
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
          loading: false,
        });
      })
      .catch((err) => {
        if (err.response.data.Text === "empty username and password") {
          this.setState({
            logInErrorMessage: "Please enter a username and password.",
            setShow: true,
            loading: false,
          });
        }
        if (err.response.data.Text === "empty username") {
          this.setState({
            logInErrorMessage: "Please choose a username.",
            setShow: true,
            loading: false,
          });
        }
        if (err.response.data.Text === "empty password") {
          this.setState({
            logInErrorMessage: "Please choose a password.",
            setShow: true,
            loading: false,
          });
        }
        if (err.response.data.Text === "redundant username") {
          this.setState({
            logInErrorMessage:
              "The username you chose is already taken.  Please try another entry.",
            setShow: true,
            loading: false,
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

    const { loading } = this.state;
    return (
      <Container
        id="login-container"
        className="container justify-content-center"
      >
        <Row id="login-title-row" className="justify-content-center">
          <BarChart className="mx-auto d-block key-icon" />
          <h3 className="mt-2 d-block text-center log-in-text">Sign up</h3>
        </Row>
        <Row className="justify-content-center">
          <Form onSubmit={this.handleNewUserSubmit}>
            <Form.Group>
              <Form.Label className="label-text">User Id</Form.Label>
              <Form.Control
                type="input"
                className="username-input"
                onChange={this.handleChange}
                placeholder=""
                name="newUsername"
                autocomplete="off"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label-text" for="exampleFormControlInput1">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                className="username-input"
                onChange={this.handleChange}
                placeholder=""
                name="newPassword"
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn btn-primary btn-lg mt-4 btn-block log-in-button"
            >
              Sign up
            </Button>
            <Button
              onClick={this.handleClick}
              type="button"
              className="btn btn-primary btn-lg mt-4 btn-block log-in-button"
            >
              I have an account
            </Button>
          </Form>
        </Row>
        <div className="container-fluid">
          {loading ? (
            <div>
              <p style={{ color: "white" }}className="mt-5 text-center">
                Creating account... Redirecting to User Portal.
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

export default SignUp;
