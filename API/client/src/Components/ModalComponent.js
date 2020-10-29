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
      action: "",
      setShow: false,
      symbol: "",
      quantity: 0,
      price: 0,
      exchange: [],
      company: "",
      orderHeader: "",
      isConfirm: false,
      error: "",
    };
  }

  componentDidMount() {
    // this.setState({
    // stockName: this.props.stocks[0].company,
    // });
    //this.getQuantity();
  }

  handleQueryChange = (event) => {
    let returnInterval;
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    returnInterval = setInterval(() => {
      this.getExchange();
      if (returnInterval !== null) {
        clearInterval(returnInterval);
      }
      return returnInterval;
    }, 2000);
  };

  handleSelectChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: "",
    });
  };

  handleQuantityChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: parseInt(value),
    });

    console.log(this.state.quantity);
  };

  getExchange = () => {
    axios
      .get("/api/stocks/exchanges/" + this.state.symbol, {})
      .then((res) => {
        this.setState({
          exchange: res.data,
          company: res.data.companyName,
          price: res.data.latestPrice,
        });
      })
      .catch((err) => {
        // if(err.response.data.title === "null exchange") {
        //  this.setState = ({
        // error: "nullExchange"
        //  })
        //     }
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

  render() {
    const stockList = this.props.stocks.map((stock, index) => (
      <option key={index} value={stock.company}>
        {stock.company} ({stock.quantity} shares)
      </option>
    ));

    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    if (this.state.isConfirm) {
      return (
        <Redirect
          to={{
            pathname: "/confirm",
            state: {
              company: this.state.company,
              quantity: this.state.quantity,
              price: this.state.price,
              symbol: this.state.symbol,
            },
          }}
        />
      );
    }

    console.log(this.state.price)

    return (
      <div>
        <Modal
          classname="purchase-modal"
          show={this.props.show}
          onHide={this.props.onHide}
        >
          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label className="ml-5 mb-0 mt-5">Action</Form.Label>
              <Form.Control
                as="select"
                className="ml-5 mt-0 modal-input w-50"
                name="action"
                onChange={this.props.handleChange}
              >
                <option>Buy</option>
                <option>Sell</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              {this.props.setAction == "Buy" ? (
                <Form>
                  <Form.Label className="mt-5 mb-0">
                    Search by company symbol
                  </Form.Label>
                  <Form.Control
                    type="input"
                    name="symbol"
                    className="w-75 modal-input"
                    onChange={this.handleQueryChange}
                  />
                  <h6 className="ml-1 mt-1 company-text">
                    {this.state.company}
                  </h6>{" "}
                </Form>
              ) : (
                <Form>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label className="current-label">
                      Current Holdings
                    </Form.Label>
                    <Form.Control
                      type="text"
                      onChange={this.handleChange}
                      name="stockName"
                      as="select"
                    >
                      {stockList}
                    </Form.Control>
                  </Form.Group>
                </Form>
              )}
            </Form.Group>
          </Form.Row>
          <Form.Row autocomplete="off">
            {this.props.setAction === "Buy" && this.state.sellSubmit !== true ? (
              <BuyQuantity
                onChange={this.handleQuantityChange}
                quantity={this.props.quantity}
              />
            ) : (
              <SellQuantity
                onChange={this.handleQuantityChange}
                stocks={this.props.stocks}
                action={this.state.action}
                stockName={this.props.stockName}
                quantity={this.props.quantity}
              />
            )}
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label className="ml-1 mt-3 mb-0">Total</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={
                  "$" + formatter.format(this.state.quantity * this.state.price)
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
      </div>
    );
  }
}

export default ModalComponent;
