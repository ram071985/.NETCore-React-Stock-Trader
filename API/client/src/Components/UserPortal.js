import React, { Component } from "react";

class UserPortal extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container-fluid main-container">
        <div className="container user-container">
          <div className="d-block row">
            <h6 className="ml-3 heading-text">User Information</h6>
            <div className="col-12">
              <h6 className="d-inline-block mb-1 titles-text">Name</h6>
              <h6 id="holdings" className="d-inline-block mb-1 titles-text">
                Holdings
              </h6>
              <h6 className="d-inline-block mb-1 name-text">Reid Muchow</h6>
              <h6 id="holding-text" className="d-inline-block mb-1 name-text">
                $0.00
              </h6>
            </div>
            <div className="col-5">
              <h6 id="wallet" className="d-inline-block mb-1 titles-text">
                Wallet
              </h6>
              <h6 className="name-text">$20,000.00</h6>
            </div>
          </div>
        </div>
        <div className="container d-inline-block holdings-container">
          <h5 className="heading-text">Current Holdings</h5>
          <div className="h-100 row">
            <div className="col"></div>
          </div>
        </div>
        <div className="container d-inline-block browse-container">
        <h5 className="heading-text">Browse Stocks</h5>
          <div className="h-100 row">
            <div className="col"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPortal;
