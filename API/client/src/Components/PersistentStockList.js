import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class PersistentStockList extends Component {
  constructor() {
    super();
    this.state = {
      stockName: "",
    };
  }

  componentDidMount() {
    this.setState({
      stockName: this.props.stocks[0].company 
    })
  }

  handleChange = (event) => {
    this.setState({
      stockName: event.target.value,
    });
  };

  render() {
    const stockList = this.props.stocks.map((stock, index) => (
      <option key={index} value={stock.company}>
        {stock.company} ({stock.quantity} shares)
      </option>
    ));
   
   
console.log(this.state.stockName)
    return (
      <div>
        <Form>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label className="current-label">Current Holdings</Form.Label>
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
      </div>
    );
  }
}

export default PersistentStockList;
