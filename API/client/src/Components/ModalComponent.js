import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ConfirmOrderModal from "./ConfirmOrderModal";
import SearchStockList from "./SearchStockList";
import PersistentStockList from "./PersistentStockList";

class ModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      action: "",
      setShow: false,
      symbol: "",
      quantity: 0,
      price: 0,
      exchange: [],
      company: "",
      error: "",
    };
  }

  componentDidMount() {
    this.setState({
      stocks: this.props.stocks,
    });
  }

  handleChange = (event) => {
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
      [name]: value,
    });
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

  handleShow = () => {
    this.setState({
      setShow: true,
    });
  };

  handleClose = () => {
    this.setState({
      setShow: false,
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

  render() {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    console.log(this.state.action);

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
                onChange={this.handleChange}
              >
                <option>Buy</option>
                <option>Sell</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label className="mt-5 mb-0">
                Search by company symbol
              </Form.Label>

              {this.state.action !== "Sell" ? (
                <SearchStockList onChange={this.handleChange} />
              ) : (
                <PersistentStockList stocks={this.state.stocks}/>
              )}

              <h6 className="ml-1 mt-1 company-text">{this.state.company}</h6>
            </Form.Group>
          </Form.Row>
          <Form.Row autocomplete="off">
            <Form.Group
              as={Col}
              controlId="formGridZip"
              className="quanity-col"
            >
              <Form.Label className="ml-5 mt-3 mb-0">Share quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                className="w-50 ml-5 d-inline-block modal-input"
                name="quantity"
                onChange={this.handleQuantityChange}
              />
            </Form.Group>
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
            onClick={this.handleShow}
          >
            Review Order
          </Button>{" "}
          <ConfirmOrderModal
            show={this.state.setShow}
            onHide={this.handleClose}
            company={this.state.company}
            quantity={this.state.quantity}
            price={formatter.format(this.state.quantity * this.state.price)}
            symbol={this.state.symbol}
          />
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
