import React, { Component } from "react";
import { BarChart } from "react-feather";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid log-in-container">
        <header className="text-center log-in-header">
          <BarChart className="mx-auto d-block key-icon" />
          <h2 className="mt-2 log-in-text">Sign Up</h2>
        </header>
        <div className="row justify-content-center">
          <div className="col-5 input-col">
            <form>
              <div class="form-group">
                <label className="label-text" for="">
                  Choose Username
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
                  Choose Password
                </label>
                <input
                  type="email"
                  className="form-control username-input"
                  id="exampleFormControlInput1"
                  placeholder=""
                />
              </div>
            </form>
            <button type="button" className="btn btn-primary btn-lg mt-4 btn-block log-in-button">
              Start trading now!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;