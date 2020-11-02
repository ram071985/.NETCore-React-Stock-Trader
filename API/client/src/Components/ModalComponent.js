import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import SellQuantity from "./SellQuantity";
import BuyQuantity from "./BuyQuantity";
import { Redirect } from "react-router-dom";

class ModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      stockName: "",
      stocks: [],
      holdingSelect: [],
      action: "",
      setShow: false,
      symbol: "",
      quantity: 0,
      newQuantity: 0,
      price: 0,
      exchange: [],
      company: "",
      orderHeader: "",
      isConfirm: false,
      error: "",
    };
  }

  handleSelectChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: "",
    });
  };

  searchStockList = () => {
    return (
      <div>
        <Form.Control
          type="input"
          name="symbol"
          className="w-75 modal-input"
          onChange={this.handleChange}
        />
      </div>
    );
  };

  persistentStockList = () => {
    return <div></div>;
  };

  isBuyTrue = () => {
    if ((this.state.action = "Buy")) {
      return true;
    }
    return false;
  };

  confirmRedirect = () => {
    this.setState({
      isConfirm: true,
    });
  };

  renderHoldings = (stock, index) => {
    return (
      <option key={index} value={stock.company}>
        {stock.company} ({stock.quantity} shares)
      </option>
    );
  };

  renderModal = () => {
    return (
      <Modal
        classname="purchase-modal"
        show={this.props.show}
        onHide={this.props.onHide}
      >
        <Form.Row>
          <div
            className="ml-3 mt-5"
            style={{
              display: this.props.isSell || this.props.isBuy ? "block" : "none",
            }}
          >
            <h4 className="text-center ml-3">
              {!this.props.isBuy ? "Sell" : "Buy"} {this.props.holding.company}{" "}
              shares
            </h4>
          </div>

          <Form.Group
            style={{
              display:
                !this.props.isSell && !this.props.isBuy ? "block" : "none",
            }}
            as={Col}
            controlId="formGridState"
          >
            <Form.Label className="ml-5 mb-0 mt-5">Action</Form.Label>
            {this.props.sellSubmit === false ? (
              <Form.Control
                as="select"
                className="ml-5 mt-0 modal-input w-50"
                name="action"
                onChange={this.props.handleChange}
              >
                <option>Buy</option>
                <option>Sell</option>{" "}
              </Form.Control>
            ) : (
              <Form.Control
                as="select"
                className="ml-5 mt-0 modal-input w-50"
                name="action"
                onChange={this.props.handleChange}
              ></Form.Control>
            )}
          </Form.Group>

          <Form.Group
            style={{
              display:
                !this.props.isSell && !this.props.isBuy ? "block" : "none",
            }}
            as={Col}
            controlId="formGridZip"
          >
            {this.props.setAction === "Buy" ? (
              <Form>
                <Form.Label className="mt-5 mb-0">
                  Search by company symbol
                </Form.Label>
                <Form.Control
                  type="input"
                  name="symbol"
                  className="w-75 modal-input"
                  onChange={this.props.handleQueryChange}
                />
                <h6 className="ml-1 mt-1 company-text">{this.props.company}</h6>{" "}
              </Form>
            ) : (
              <Form>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label className="current-label">
                    Current Holdings
                  </Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(event) => this.props.handleHoldings(event)}
                    name="stockName"
                    as="select"
                  >
                    {this.props.stocks.map((index) =>
                      this.props.modalHoldings(index)
                    )}
                  </Form.Control>
                </Form.Group>
              </Form>
            )}
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {this.props.setAction === "Buy" && this.state.sellSubmit !== true ? (
            <BuyQuantity
              onChange={this.props.handleBuyQuantity}
              quantity={this.props.quantity}
            />
          ) : (
            <SellQuantity
              onChange={this.props.quantityChange}
              stocks={this.props.stocks}
              action={this.state.action}
              stockName={this.props.stockName}
              quantity={this.props.quantity}
              quantityChange={this.props.quantityChange}
              sellIncrement={this.props.sellIncrement}
            />
          )}
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label className="ml-1 mt-3 mb-0">Total</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={
                "$" +
                this.props
                  .formatter()
                  .format(this.props.dynamicQuantity * this.props.price)
              }
              className="w-50 ml-1 modal-input"
              readOnly
            />
          </Form.Group>
        </Form.Row>
        <br />
        <hr />
        <h6 className="text-center">
          Your Order is not complete yet. Review and confirm your order in the
          next step.
        </h6>
        <Button
          className="d-inline-block mx-auto review-button"
          variant="secondary"
          onClick={this.confirmRedirect}
        >
          Review Order
        </Button>{" "}
        <Button
          onClick={this.props.onHide}
          className="d-inline-block mx-auto cancel-button"
          variant="danger"
        >
          Cancel Order
        </Button>{" "}
      </Modal>
    );
  };

  render() {
    if (this.state.isConfirm) {
      return (
        <Redirect
          to={{
            pathname: "/confirm",
            state: {
              company: this.props.company,
              quantity: this.props.dynamicQuantity,
              price: this.props.price,
              symbol: this.props.symbol,
              action: this.props.setAction,
              isBuy: this.props.isBuy,
              isSell: this.props.isSell
            },
          }}
        />
      );
    }

    return <div>{this.renderModal()}</div>;
  }
}

export default ModalComponent;
