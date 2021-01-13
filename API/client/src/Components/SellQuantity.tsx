import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface ISellQuantity {
  quantity: number
  quantityChange(event: React.ChangeEvent): void
}

class SellQuantity extends Component<ISellQuantity, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="buy-quantity">
        <Form className="buy-quantity-form">
          <Form.Group as={Col} controlId="formGridZip" className="quantity-col">
            <Form.Label className="ml-5 mt-3 mb-0 buy-label">
              Share quantity
            </Form.Label>
            <Col className="quantity-col" lg={12}>
              <Form.Control
                type="number"
                min="1"
                max={this.props.quantity}
                className="w-50 ml-5 d-inline-block quantity-modal-input"
                name="quantity"
                onChange={this.props.quantityChange}
              />
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SellQuantity;
