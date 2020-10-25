import React, { Component } from "react";
import Form from "react-bootstrap/Form";
class SearchStockList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Form.Control
          type="input"
          name="symbol"
          className="w-75 modal-input"
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default SearchStockList;
