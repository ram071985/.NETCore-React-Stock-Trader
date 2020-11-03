import React, { Component } from "react";
import { BarChart } from "react-feather";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
      tologIn: false,
    };
  }

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
          tologIn: true,
        });
      })
      .catch((err) => {
        if (err.response.data.title === "empty username") {
          this.setState({
            errorMessage: "Please choose a username.",
          });
        }
        if (err.response.data.title === "empty password") {
          this.setState({
            errorMessage: "Please choose a password.",
          });
        }
        if (err.response.data.title === "redundant username") {
          this.setState({
            errorMessage:
              "The username you chose is already taken.  Please try another entry.",
          });
        }
      });
  };

  render() {
    console.log(this.state.toLogIn);
    if (this.state.toLogIn === true) return <Redirect to="/log-in" />;

    return (
      <div className="container-fluid log-in-container">
        <header className="text-center log-in-header">
          <BarChart className="mx-auto d-block key-icon" />
          <h2 className="mt-2 log-in-text">Sign Up</h2>
        </header>
        <div className="row justify-content-center">
          <div className="col-5 input-col">
            <form onSubmit={this.handleNewUserSubmit}>
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
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg mt-4 btn-block log-in-button"
              >
                Start trading now!
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
