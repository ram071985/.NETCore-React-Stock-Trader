import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";

class ConfirmOrderModal extends Component {
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

  putStockPurchase = () => {
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    axios
      .put("/api/transaction/buy", {
        userId: parseUserId,
        balance: this.props.price,
      })
      .catch((err) => {});
  };

  postNewTransaction = () => {
    this.putStockPurchase();
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    axios
      .post("/api/transaction/buy", {
        userId: parseUserId,
        withdrawal: this.props.price,
        quantity: this.props.quantity,
        exchange: this.props.symbol,
      })
      .catch((err) => {});
    this.addStockRecord();
  };

  addStockRecord = () => {
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    axios.post("/api/transaction/add-stock", {
      userId: parseUserId,
      company: this.props.company,
      symbol: this.props.symbol,
      quantity: this.props.quantity,
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
    console.log(this.props.location.state.quantity);

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
        <h6 className="ml-5">
          {this.props.location.state.company}
          <span> ({this.props.location.state.symbol})</span>
        </h6>
        <h6 className="ml-5">
          Quantity{this.props.location.state.action === "Sell" ? " Sold" : ""}:{" "}
          {this.props.location.state.quantity}
        </h6>
        <h6 className="ml-5">Price: ${this.props.location.state.price}</h6>
        <h2 className="mt-5 ml-5">Order Summary</h2>
        <h6></h6>
        <h6 className="mt-2 ml-5">
          Subtotal
          <span className="confirm-span">
            ${this.props.location.state.price} x{" "}
            {this.props.location.state.quantity} (shares) = $
            {this.decimalFormatter().format(
              this.props.location.state.quantity *
                this.props.location.state.price
            )}
          </span>
        </h6>
        <hr></hr>
        <h5 className="ml-5">
          Total
          <span className="confirm-span">
            $
            {this.decimalFormatter().format(
              this.props.location.state.quantity *
                this.props.location.state.price
            )}
          </span>
        </h5>
        <Button
          className="mt-4 d-inline-block mx-auto"
          variant="secondary"
          onClick={this.postNewTransaction}
        >
          Confirm Purchase
        </Button>{" "}
        <Button
          onClick={this.props.onHide}
          className="d-inline-block mx-auto cancel-button"
          variant="danger"
          onClick={this.handleClose}
        >
          Cancel Order
        </Button>{" "}
      </div>
    );
  }
}

export default ConfirmOrderModal;
