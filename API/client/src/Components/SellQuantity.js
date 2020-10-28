import Axios from "axios";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Col from "react-bootstrap/Col";

class SellQuantity extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
  

  }



  handleQuantityChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    console.log(this.props.quantity);
    return (
      <div>
        <Form>
          <Form.Group as={Col} controlId="formGridZip" className="quanity-col">
            <Form.Label className="ml-5 mt-3 mb-0">Share quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max={this.props.sellQuantity}
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
