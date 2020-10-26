import Axios from "axios";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Col from "react-bootstrap/Col";

class SellQuantity extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
      stockName: "",
    };
  }

  componentDidMount() {
    this.setState({
      stockName: this.props.stocks[0].company,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      stockName: event.textContent,
    });
  };

  handleQuantityChange = (event) => {
    this.getQuantityFromDatabase();
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  getQuantityFromDatabase = () => {
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    axios
      .post("/api/stocks/quantity", {
        userId: parseUserId,
        company: this.state.stockName,
      })
      .then((res) => {
        this.setState({
          quantity: res.data.quantity,
        });
        console.log(res.data);
      });
  };

  render() {
 console.log(this.props.action)
    console.log(this.state.stockName);

    return (
      <div>
        <Form>
          <Form.Group as={Col} controlId="formGridZip" className="quanity-col">
            <Form.Label className="ml-5 mt-3 mb-0">Share quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max={this.state.quantity}
              className="w-50 ml-5 d-inline-block modal-input"
              name="quantity"
              onChange={this.handleQuantityChange}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SellQuantity;
