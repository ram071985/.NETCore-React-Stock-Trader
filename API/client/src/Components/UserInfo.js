import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

class UserInfo extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
        <div className="container-fluid d-block container user-container">
          <div className="d-block row">
            <h4 className="d-inline-block ml-3 mr-3 heading-text">
              User Information
            </h4>
            <Button
              onClick={this.handleShow}
              className="buy-sell-button"
              variant="success"
            >
              <span className="font-weight-light">Buy/Sell Stocks</span>
            </Button>{" "}
            <hr style={{ borderTop: "1px solid #1aac3c", width: "100%" }} />
            <div className="col-12">
              <h6 className="font-weight-normal d-inline-block mb-1 titles-text">
                User{" "}
              </h6>
              <h6 className="font-weight-light d-block mb-2 name-text">
                {this.props.loading ? (
                  <Spinner
                    className="ml-2"
                    variant="success"
                    animation="border"
                    size="sm"
                  />
                ) : (
                  this.props.username
                )}
              </h6>
              <h6
                id="holdings"
                className="font-weight-normal d-inline-block mb-1 titles-text"
              >
                Holdings:
              </h6>
              <h6
                id="holding-text"
                className="font-weight-light d-block mb-2 name-text"
              >
                $
                {this.props.loading ? (
                  <Spinner
                    className="ml-2"
                    variant="success"
                    animation="border"
                    size="sm"
                  />
                ) : (
                  this.props.formatter().format(this.props.holdings)
                )}
              </h6>
            </div>
            <div className="col-5">
              <h6
                id="wallet"
                className="font-weight-normal d-inline-block mb-1 titles-text"
              >
                Wallet
              </h6>
              <h6 className="font-weight-light name-text mb-2">
                $
                {this.props.loading ? (
                  <Spinner
                    className="ml-2"
                    variant="success"
                    animation="border"
                    size="sm"
                  />
                ) : (
                  this.props.formatter().format(this.props.wallet)
                )}
              </h6>
            </div>
          </div>
        </div>
    );
  }
}

export default UserInfo;