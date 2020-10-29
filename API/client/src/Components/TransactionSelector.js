import Axios from "axios";
import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Col from "react-bootstrap/Col";

class TransactionSelector extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {

  }

  getQuantity = () => {
    if (this.props.stockName === this.props.stocks[0].company) {
        const filter = this.state.stocks.filter(
          (name) => name.company === this.props.stockName
        );
        this.setState({
          quantity: filter[0].quantity,
        });
      }
  }

  handleQuantityChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    console.log(this.state.quantity);
    return (
      <div>
       
      </div>
    );
  }
}

export default TransactionSelector;
