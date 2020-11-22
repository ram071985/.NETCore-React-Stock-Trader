import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class ProtectedRoute extends Component {
  render() {
      const Component = this.props.component;
      const isAuthenticated = localStorage.getItem("session_id");

      return isAuthenticated !== null ? (
          <Component />
      ) : (
          <Redirect to={{ pathname: "/landing-page" }}/>
      )
  }
}

export default ProtectedRoute;
