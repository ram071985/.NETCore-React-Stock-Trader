import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class PersistentStockList extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
    };
  }

  render() {
    const stockList = this.props.items.map((stock, index) => (
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Example select</Form.Label>
        <Form.Control as="select"></Form.Control>
        <option >
          1
        </option>
      </Form.Group>
    ));
    console.log(this.state.stocks);
    return <div>{stockList}</div>;
  }
}

export default PersistentStockList;
