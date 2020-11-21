import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SellQuantity from "./SellQuantity";
import BuyQuantity from "./BuyQuantity";
import ReviewAlert from "./ReviewAlert";
import { Redirect } from "react-router-dom";
import { CheckCircle } from "react-feather";
import { XCircle } from "react-feather";

class ModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      orderHeader: "",
      errorMessage: "",
      setShow: false,
    };
  }

  renderAlert = () => {
    if (this.props.errorMessage !== "") {
      return (
        <ReviewAlert
          handleClose={this.handleAlertClose}
          wallet={this.props.wallet}
          price={this.props.price}
          errorMessage={this.props.errorMessage}
          setAlertShow={this.props.setAlertShow}
        />
      );
    }
  };

  handleAlertClose = () => {
    this.setState({
      setShow: false,
      errorMessage: "",
    });
  };

  render() {
    if (this.props.isConfirm) {
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
              isSell: this.props.isSell,
              holdings: this.props.holdings,
            },
          }}
        />
      );
    }
    const { action } = this.props;
    return (
      <div>
        {" "}
        <Modal
          classname="purchase-modal"
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <Form.Row>
            <div
              className="ml-3 mt-5"
              style={{
                display:
                  this.props.isSell || this.props.isBuy ? "block" : "none",
              }}
            >
              <h4 className="text-center ml-3">
                {!this.props.isBuy ? "Sell" : "Buy"}{" "}
                {this.props.holding.company} shares
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
                  {this.props.stocks.length === 0 ? (
                    <option disabled>Sell</option>
                  ) : (
                    <option>Sell</option>
                  )}
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
                <Form className="search-form">
                  <Form.Label className="mt-5 mb-0">
                    Search by company symbol
                  </Form.Label>
                  <Form.Control
                    type="input"
                    name="symbol"
                    className="text-uppercase w-75 modal-input"
                    onChange={this.props.handleQueryChange}
                  />
                  <CheckCircle
                    style={{
                      display:
                        !this.props.isSearching &&
                        this.props.isSymbol === "Known symbol"
                          ? "block"
                          : "none",
                    }}
                    className="search-icon"
                  />
                  <XCircle
                    style={{
                      display:
                        !this.props.isSearching &&
                        this.props.isSymbol === "Unknown symbol"
                          ? "block"
                          : "none",
                    }}
                    className="x-icon"
                  />
                  <h6 className="d-block ml-1 mt-1 result-text">
                    {this.props.company}
                  </h6>{" "}
                </Form>
              ) : (
                <Form>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className="current-label">
                      Current Holdings
                    </Form.Label>
                    <Form.Control
                      type="hidden"
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
            {this.props.setAction === "Buy" || this.props.isBuy ? (
              <BuyQuantity
                onChange={this.props.handleBuyQuantity}
                quantity={this.props.quantity}
                symbol={this.props.symbol}
              />
            ) : (
              <SellQuantity
                onChange={this.props.quantityChange}
                stocks={this.props.stocks}
                stockName={this.props.stockName}
                quantity={this.props.quantity}
                quantityChange={this.props.quantityChange}
                sellIncrement={this.props.sellIncrement}
              />
            )}
            <Form.Group className="mb-0" as={Col} controlId="formGridZip">
              <Form.Label className="ml-1 mt-3 mb-0">Total</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={
                  this.props.isSymbol === "Unknown symbol"
                    ? "$" + this.props.formatter().format(0)
                    : "$" +
                      this.props
                        .formatter()
                        .format(this.props.dynamicQuantity * this.props.price)
                }
                className="w-50 ml-1 modal-input"
                readOnly
              />
            </Form.Group>
            {this.renderAlert()}
          </Form.Row>
          <hr />
          <h6 className="text-center">
            Your Order is not complete yet. Review and confirm your order in the
            next step.
          </h6>
          <Button
            className="d-inline-block mx-auto review-button"
            variant="secondary"
            onClick={this.props.confirmRedirect}
          >
            Review Order
          </Button>{" "}
          <Button
            onClick={(e) => this.props.onHide(e)}
            className="d-inline-block mx-auto cancel-button"
            variant="danger"
          >
            Cancel Order
          </Button>{" "}
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
