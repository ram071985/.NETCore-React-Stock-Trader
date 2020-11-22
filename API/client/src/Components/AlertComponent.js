import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

class AlertComponent extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
      return (
        <div className="d-block container">
        <Alert
          style={{
            display: this.props.logInErrorMessage !== "" ? "block" : "none",
          }}
          show={this.props.setShow}
          className="d-block"
          variant="danger"
          onClose={this.props.handleClose}
          dismissible
        >
          <Alert.Heading>Whoops! You forgot something.</Alert.Heading>
          <p>{this.props.logInErrorMessage}</p>
        </Alert>
      </div>
      )
  }
}

export default AlertComponent;
