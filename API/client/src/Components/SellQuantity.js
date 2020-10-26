import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class SellQuantity extends Component {
  constructor() {
    super();
    this.state = {
        quantity: 0,
        stockName: ""
    };
  }

  componentDidMount() {}

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      stockName: event.textContent,
    });
  };

  handleQuantityChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  getQuantityFromDatabase = () => {
    
  }

  render() {
    const stockList = this.props.stocks[0].map((stock, index) => (
      <option key={index} value={stock.company}>
        {stock.company} ({stock.quantity} shares)
      </option>
    ));
    let i;
    //for (i = 1; i * )

    console.log(this.state.stockName);

    return (
      <div>
        <Form>
          <Form.Group as={Col} controlId="formGridZip" className="quanity-col">
            <Form.Label className="ml-5 mt-3 mb-0">Share quantity</Form.Label>
            <Form.Control
              type="number"
              min="1"
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
