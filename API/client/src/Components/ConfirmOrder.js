import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";

class ConfirmOrder extends Component {
  constructor() {
    super();
    this.state = {
      symbol: "",
      quantity: 0,
      price: 0,
      exchange: [],
      company: "",
      error: "",
      cancel: false,
    };
  }

  handleChange = (event) => {
    let returnInterval;
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleQuantityChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleClose = () => {
    this.setState({
      cancel: true,
    });
  };

  putStockTransaction = () => {
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    if (this.props.location.state.action === "Buy" || this.props.location.state.isBuy) {
      axios
        .put("/api/transaction/buy", {
          userId: parseUserId,
          balance:
            this.props.location.state.price *
            this.props.location.state.quantity,
        })
        .catch((err) => {});
    }
    if (this.props.location.state.action === "Sell" || this.props.location.state.isSell) {
    axios
      .put("/api/transaction/sell", {
        userId: parseUserId,
        balance:
          this.props.location.state.price * this.props.location.state.quantity,
      })
      .catch((err) => {});
    }
  };

  postNewDepositTransaction = () => {
    this.putStockTransaction();
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    axios
      .post("/api/transaction/sell", {
        userId: parseUserId,
        deposit:
          this.props.location.state.price * this.props.location.state.quantity,
        quantity: this.props.location.state.quantity,
        exchange: this.props.location.state.symbol,
      })
      .catch((err) => {});
    this.deleteStockRecord();
  };

  postNewWithdrawalTransaction = () => {
    this.putStockTransaction();
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    axios
      .post("/api/transaction/buy", {
        userId: parseUserId,
        withdrawal:
          this.props.location.state.price * this.props.location.state.quantity,
        quantity: this.props.location.state.quantity,
        exchange: this.props.location.state.symbol,
      })
      .catch((err) => {
        
      });
    this.addStockRecord();
  };

  addStockRecord = () => {
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    axios.post("/api/transaction/add-stock", {
      userId: parseUserId,
      company: this.props.location.state.company,
      symbol: this.props.location.state.symbol,
      quantity: this.props.location.state.quantity,
    });
  };

  deleteStockRecord = () => {
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    axios.post("/api/transaction/delete-stock", {
      userId: parseUserId,
      company: this.props.location.state.company,
      symbol: this.props.location.state.symbol,
      quantity: this.props.location.state.quantity,
    });
  };

  decimalFormatter = () => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter;
  };

  render() {
    console.log(this.props.location.state.isBuy);
    console.log(this.props.location.state.action);
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (this.state.cancel) {
      return (
        <Redirect
          to={{
            pathname: "/user-portal",
          }}
        />
      );
    }

    return (
      <div>
        <h2 className="mt-4 ml-5">{}</h2>
        <h6 className="font-weight-normal text-center ml-5">
          {this.props.location.state.company}
          <span>(</span><span className="text-uppercase special-characters">{this.props.location.state.symbol}</span><span>)</span>
        </h6>
        <h6 className="font-weight-normal text-center ml-5">
          Quantity{this.props.location.state.isSell || this.props.location.state.action === "Sell" ? " Sold" : ""}:{" "}
          {this.props.location.state.quantity}
        </h6>
        <h6 className="font-weight-normal text-center ml-5">Price: ${this.decimalFormatter().format(this.props.location.state.price)}</h6>
        <h2 className="text-center mt-5 ml-5">Order Summary</h2>
        <h6></h6>
        <h6 className="font-weight-bold text-center mt-2 ml-5">
          Subtotal:
          <span className="font-weight-normal text-center confirm-span">
            ${this.props.location.state.price} x{" "}
            {this.props.location.state.quantity} (<span className="special-characters">shares</span>) = $
            {this.decimalFormatter().format(
              this.props.location.state.quantity *
                this.props.location.state.price
            )}
          </span>
        </h6>
        <hr></hr>
        <h5 className="text-center ml-5">
          Total:
          <span className="font-weight-normal text-center confirm-span">
            $
            {this.decimalFormatter().format(
              this.props.location.state.quantity *
                this.props.location.state.price
            )}
          </span>
        </h5>
        <Button
          className="mt-4 confirm-button"
          variant="secondary"
          onClick={
            this.props.location.state.action === "Buy"
              ? this.postNewWithdrawalTransaction
              : this.postNewDepositTransaction
          }
        >
          Confirm
        </Button>{" "}
        <Button
          onClick={this.props.onHide}
          className="d-inline-block mx-auto cancel-button"
          variant="danger"
          onClick={this.handleClose}
        >
          Cancel
        </Button>{" "}
      </div>
    );
  }
}

export default ConfirmOrder;
