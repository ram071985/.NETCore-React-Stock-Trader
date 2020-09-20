import React, { Component } from "react";
import { Key } from "react-feather";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid log-in-container">
        <header className="text-center log-in-header">
          <Key className="mx-auto d-block key-icon" />
          <h2 className="mt-2 log-in-text">Log in</h2>
        </header>
        <div className="row justify-content-center">
          <div className="col-5 input-col">
            <form>
              <div class="form-group">
                <label className="label-text" for="">
                  User Id
                </label>
                <input
                  type="email"
                  className="form-control username-input"
                  id="exampleFormControlInput1"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label className="label-text" for="exampleFormControlInput1">
                  Password
                </label>
                <input
                  type="email"
                  className="form-control username-input"
                  id="exampleFormControlInput1"
                  placeholder=""
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;
