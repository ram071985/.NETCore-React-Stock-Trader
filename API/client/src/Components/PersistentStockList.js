import React, { Component } from "react";
import Form from "react-bootstrap/Form";

class PersistentStockList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const stockList = this.props.stocks[0].map((stock, index) => (
      <option key={index} value={stock.company}>{stock.company}</option>
    ));
    console.log(this.props.stocks)
    return (
      <div>
        <select>{stockList}</select>
      </div>
    );
  }
}

export default PersistentStockList;
