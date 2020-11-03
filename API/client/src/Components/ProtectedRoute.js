import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserPortal from "./UserPortal"

class ProtectedRoute extends Component {
  render() {
      const Component = this.props.component;
      const isAuthenticated = localStorage.getItem("session-id");

      return isAuthenticated !== null ? (
          <UserPortal />
      ) : (
          <Redirect to={{ pathname: "/landing-page" }}/>
      )
  }
}

export default ProtectedRoute;
