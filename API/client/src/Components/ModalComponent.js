import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";

class ModalComponent extends Component {
  constructor() {
    super();
    this.state = {
      action: "Buy",
      symbol: "",
      quantity: 0,
      price: 0,
      exchange: [],
      error: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    let resultInterval = setInterval(() => {
      this.getExchange();
    }, 2000);
    if (this.state.exchange !== null) {
      console.log(this.state.symbol)
      return clearInterval(resultInterval);    
    }
      return resultInterval;
  };

  getExchange = () => {
    axios
      .get("/api/stocks/exchanges/" + this.state.symbol, {})
      .then((res) => {
        
        const allStocks = [...this.state.stocks];
        this.setState({
          exchange: [...res.data],
        });
        console.log(this.state.exchange);
      })
      .catch((err) => {
        // if(err.response.data.title === "null exchange") {
        //  this.setState = ({
        // error: "nullExchange"
        //  })
        //     }
      });
  };

  render() {
    console.log(this.state.symbol);
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
              <Form.Control
                type="input"
                name="symbol"
                className="w-75 modal-input"
                onChange={this.handleChange}
              />
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
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label className="ml-1 mt-3 mb-0">Total</Form.Label>
              <Form.Control type="text" className="w-50 ml-1 modal-input" />
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
