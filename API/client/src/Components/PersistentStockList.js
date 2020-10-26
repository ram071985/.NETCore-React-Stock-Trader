import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class PersistentStockList extends Component {
  constructor() {
    super();
    this.state = {
      stockName: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const stockList = this.props.stocks[0].map((stock, index) => (
      <option key={index} value={stock.company}>
        {stock.company}
      </option>
    ));
    console.log(this.state.stockName);
    this.props.stocks.includes();
    return (
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="current-label">Current Holdings</Form.Label>
            <Form.Control
              onChange={this.handleChange}
              name="stockName"
              as="select"
            >
              {stockList}
            </Form.Control>
          </Form.Group>
        </Form>

        <h6 className="ml-1 company-text">Shares Owned: {}</h6>
      </div>
    );
  }
}

export default PersistentStockList;
