import React, { Component } from "react";
import Alert from "react-bootstrap/Alert";

class ReviewAlert extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="d-block container">
        <Alert show={this.props.show} onClose={this.props.onClose} style={{ display: this.props.wallet < parseFloat(this.props.price) * this.props.dynamicQuantity ? 'block' : 'none'}} variant="danger">
          Insufficient funds. Check your wallet balance and try again.
        </Alert>
      </div>
    );
  }
}

export default ReviewAlert;
