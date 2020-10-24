import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

class ConfirmOrderModal extends Component {
  constructor() {
    super();
    this.state = {
      action: "Buy",
      symbol: "",
      quantity: 0,
      price: 0,
      exchange: [],
      company: "",
      error: "",
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
      quantity: this.props.quantity
    })
  };

  render() {
    console.log(this.props.price);

    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return (
      <div>
        <Modal
          className="purchase-modal"
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <h2 className="mt-4 ml-5">Stock Purchase</h2>
          <h6 className="ml-5">
            {this.props.company}
            <span>({this.props.symbol})</span>
          </h6>
          <h6 className="ml-5">QTY {this.props.quantity}</h6>
          <h6 className="ml-5">Price: ${this.props.price}</h6>
          <h2 className="mt-5 ml-5">Order Summary</h2>
          <h6></h6>
          <h6 className="mt-2 ml-5">
            Subtotal<span className="confirm-span">${this.props.price}</span>
          </h6>
          <hr></hr>
          <h5 className="ml-5">
            Total<span className="confirm-span">${this.props.price}</span>
          </h5>
          <Button
            className="mt-4 d-inline-block mx-auto"
            variant="secondary"
            onClick={this.postNewTransaction}
          >
            Confirm Purchase
          </Button>{" "}
        </Modal>
      </div>
    );
  }
}

export default ConfirmOrderModal;
