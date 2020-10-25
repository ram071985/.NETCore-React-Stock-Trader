import React, { Component } from "react";
import Form from "react-bootstrap/Form"

class PersistentStockList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const stocks = this.props.stocks.map((stock, index) => (
      <div key={index}>
        <option>{stock.company}</option>
      </div>
    ));
  
    return (
      <div>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Example multiple select</Form.Label>
          <Form.Control as="select" multiple>
            <option>{stocks}</option>
          </Form.Control>
        </Form.Group>
      </div>
    );
  }
}

export default PersistentStockList;
