import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

class ReviewAlert extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="d-block container review-container">
        <Alert
        className="review-alert"
          show={this.props.setAlertShow}
          onClose={this.props.handleClose}
          style={{
            display:
              this.props.errorMessage !== ""
                ? "block"
                : "none",
          }}
          variant="danger"
        >
          {this.props.errorMessage}
        </Alert>
      </div>
    );
  }
}

export default ReviewAlert;
