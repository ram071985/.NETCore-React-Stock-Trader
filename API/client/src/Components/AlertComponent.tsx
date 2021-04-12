import React, { Component } from "react";
import { Row, Alert } from "react-bootstrap";

interface IAlertComponent {
  logInErrorMessage: string
  setShow: boolean
  handleClose(): void;
}

class AlertComponent extends Component<IAlertComponent, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="d-block container-fluid justify-content-center alert-container">
        <Row className="justify-content-center">
          {" "}
          <Alert
            style={{
              display: this.props.logInErrorMessage !== "" ? "block" : "none",
            }}
            show={this.props.setShow}
            className="d-block alert-box"
            variant="danger"
            onClose={this.props.handleClose}
            dismissible
          >
            <Alert.Heading className="alert-big">Whoops! You forgot something.</Alert.Heading>
            <p className="alert-message">{this.props.logInErrorMessage}</p>
          </Alert>
        </Row>
      </div>
    );
  }
}

export default AlertComponent;
