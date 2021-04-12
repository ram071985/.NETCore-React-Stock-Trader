import React, { Component } from "react";
import Form from "react-bootstrap/Form";

interface ISearchStockList {
  quantityChange(event: React.ChangeEvent): any
  company: string
}

class SearchStockList extends Component<ISearchStockList, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Form.Label className="mt-5 mb-0">Search by company symbol</Form.Label>
        <Form.Control
          type="input"
          name="symbol"
          className="w-75 modal-input"
          onChange={this.props.quantityChange}
        />
        <h6 className="ml-1 mt-1 company-text">{this.props.company}</h6>
      </div>
    );
  }
}

export default SearchStockList;

