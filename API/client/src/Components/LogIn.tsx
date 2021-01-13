import React, { Component } from "react";
import { Key } from "react-feather";
import axios from "axios";
import { Redirect, RouteComponentProps } from "react-router-dom";
import AlertComponent from "./AlertComponent";
import Spinner from "react-bootstrap/Spinner";
import { Container, Row, Form, Button } from "react-bootstrap";

interface ITraderState {
  newUsername: string,
  newPassword: string,
  existingUsername: string,
  existingPassword: string,
  errorMessage: string,
  logInErrorMessage: string,
  toUserPortal: boolean,
  setShow: boolean,
  loading: boolean,
}

class LogIn extends Component<ITraderState & RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
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

  handleChange = (event: any) => {
    const { name, value } = event.currentTarget as HTMLInputElement;
    this.setState({
      [name]: value,
      errorMessage: "",
      logInErrorMessage: "",
    }as any);
  };

  handleClick = async () => {
    const { history } = this.props;
    history.push("/sign-up");
  };

  handleSubmit = (e: React.ChangeEvent<any>):void => {
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
        console.log(err.response);
        if (err.response.data.Text === "empty username and password") {
          this.setState({
            logInErrorMessage: "Please enter a username and password.",
            setShow: true,
            loading: false,
          });
        }

        if (err.response.data.Text === "empty username") {
          this.setState({
            logInErrorMessage: "Please enter a username.",
            setShow: true,
            loading: false,
          });
        }

        if (err.response.data.Text === "empty password") {
          this.setState({
            logInErrorMessage: "Please enter a password.",
            setShow: true,
            loading: false,
          });
        }

        if (err.response.data.Text === "false username") {
          this.setState({
            logInErrorMessage:
              "The username you chose is already taken. Please try another entry.",
            setShow: true,
            loading: false,
          });
        }

        if (err.response.data.Text === "username doesn't exist") {
          this.setState({
            logInErrorMessage:
              "This username does not exist. Please enter an existing username.",
            setShow: true,
            loading: false,
          });
        }
        if (err.response.data.Text === "wrong credentials") {
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

  public render() {
    if (this.state.toUserPortal === true) return <Redirect to="/" />;

    const { loading } = this.state;
    console.log(this.state.logInErrorMessage);
    return (
      <Container
        id="login-container"
        className="container justify-content-center"
      >
        <Row id="login-title-row" className="justify-content-center">
          <Key className="mx-auto d-block key-icon" />
          <h3 className="mt-2 d-block text-center log-in-text">Log in</h3>
        </Row>
        <Row className="justify-content-center">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label className="label-text">User Id</Form.Label>
              <Form.Control
                type="input"
                className="username-input"
                onChange={this.handleChange}
                placeholder=""
                name="existingUsername"
                autoComplete="off"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label-text" data-for="exampleFormControlInput1">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                className="username-input"
                onChange={this.handleChange}
                placeholder=""
                name="existingPassword"
                autoComplete="off"
              />
            </Form.Group>
            <Button
              type="submit"
              className="btn btn-lg mt-4 btn-block log-in-button"
            >
              Log in
            </Button>
            <Button
              onClick={this.handleClick}
              type="button"
              className="btn btn-lg mt-4 btn-block log-in-button"
            >
              I'm not registered
            </Button>
          </Form>
          {loading ? (
            <div>
              <p style={{ color: "white" }} className="mt-5 text-center">
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
        </Row>
        {this.renderAlert()}
      </Container>
    );
  }
}

export default LogIn as any;
