import React, { Component } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";
import SellQuantity from "./SellQuantity";
import BuyQuantity from "./BuyQuantity";
import ReviewAlert from "./ReviewAlert";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { CheckCircle } from "react-feather";
import { XCircle } from "react-feather";

interface IModalState {
  orderHeader: string,
  errorMessage: string,
  setShow: boolean
  wallet: number,
  price: number,
  setAlertShow: boolean
  isConfirm: boolean
  company: string
  dynamicQuantity: number
  symbol: string
  setAction: string
  isBuy: boolean
  isSell: boolean
  holdings: number
  show: boolean
  onHide(e: React.MouseEvent): void;
  holding: {company: string}
  sellSubmit: boolean
  handleChange(event: React.ChangeEvent): void;
  stocks: never[]
  handleQueryChange(event: React.ChangeEvent): any;
  isSearching: boolean
  isSymbol: string
  handleHoldings(event: React.ChangeEvent): any;
  modalHoldings(OptionHTMLAttributes: any): any
  handleBuyQuantity(): void
  quantity: number
  quantityChange(event: React.ChangeEvent): any;
  stockName: string
  confirmRedirect(e: React.MouseEvent): void;
  formatter(): Intl.NumberFormat
}

class ModalComponent extends Component<IModalState & RouteComponentProps, any> {
  constructor(props: any) {
    super(props);
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
    return (
      <div>
        {" "}
        <Modal
          className="purchase-modal"
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
              <h4 className="text-center review-company">
                {!this.props.isBuy ? "Sell" : "Buy"}{" "}
                {this.props.holding.company}
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
              className="search-col"
            >
              {this.props.setAction === "Buy" ? (
                <Form className="search-form">
                  <Form.Label className="mt-5 mb-0 search-label">
                    Search by symbol
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
              />
            ) : (
                <SellQuantity 
                  quantity={this.props.quantity}
                  quantityChange={this.props.quantityChange}
                  />
              )}
            <Form.Group className="mb-0" as={Col} controlId="formGridZip">
              <Form.Label className="ml-3 mt-3 mb-0 total-label">Total</Form.Label>
              <Col className="total-col" sm={5}>
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
                  className="w-50 ml-1 total-modal-input"
                  readOnly
                />
              </Col>
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
