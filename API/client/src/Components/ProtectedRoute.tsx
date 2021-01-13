import React, { Component } from "react";
import { Redirect } from "react-router-dom";

interface IProtectedRoute {
    component: any
}

class ProtectedRoute extends Component<IProtectedRoute, any> {
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
