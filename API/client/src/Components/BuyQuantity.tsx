import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface IBuyQuantity {
  onChange(event: React.ChangeEvent): void
}

class BuyQuantity extends Component<IBuyQuantity, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="buy-quantity">
        <Form className="buy-quantity-form">
          <Form.Group as={Col} controlId="formGridZip" className="quantity-col">
            <Form.Label className="ml-5 mt-3 mb-0 buy-label">Share quantity</Form.Label>
            <Col className="quantity-col" lg={12}>
            <Form.Control
              type="number"
              min="1"
              max="100"
              className="w-50 ml-5 d-inline-block quantity-modal-input"
              name="quantity"
              onChange={this.props.onChange}
            />
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default BuyQuantity;
