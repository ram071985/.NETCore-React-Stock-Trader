import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class UserPortal extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      exchange: "",
      symbol: "",
      companyName: "Facebook Inc",
      sharePrice: 0,
      errorMessage: "",
      returnedQuery: false,
      setShow: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: "",
    });
  };

  handleShow = () => {
    this.setState({
      setShow: true,
    });
  };

  handleClose = () => {
    this.setState({
      setShow: false,
    });
  };
  
  addModal = () => {

  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.getStock();
  };

  getStock = () => {
    axios
      .get("/api/stocks/exchanges/" + this.state.exchange, {})
      .then((res) => {
        console.log(res.data.iexRealtimePrice);
        const allStocks = [...this.state.stocks];
        if (res === null) {
          this.setState({
            returnedQuery: false,
          });
        }
        this.setState({
          symbol: res.data.symbol,
          companyName: res.data.companyName,
          sharePrice: res.data.iexRealtimePrice,
          returnedQuery: false,
        });
      })
      .catch((err) => {});
  };

  render() {
    return (
      <div className="container-fluid main-container">
        <div className="container user-container">
          <div className="d-block row">
            <h6 className="ml-3 heading-text">User Information</h6>
            <div className="col-12">
              <h6 className="d-inline-block mb-1 titles-text">Name</h6>
              <h6 id="holdings" className="d-inline-block mb-1 titles-text">
                Holdings
              </h6>
              <h6 className="d-inline-block mb-1 name-text">Reid Muchow</h6>
              <h6 id="holding-text" className="d-inline-block mb-1 name-text">
                $0.00
              </h6>
            </div>
            <div className="col-5">
              <h6 id="wallet" className="d-inline-block mb-1 titles-text">
                Wallet
              </h6>
              <h6 className="name-text">$20,000.00</h6>
            </div>
          </div>
        </div>
        <div className="container d-inline-block holdings-container">
          <h5 className="heading-text">Current Holdings</h5>
          <h6 className="symbols-text">Symbols/Stock Names</h6>
        </div>
        <div className="container d-inline-block browse-container">
          <h5 className="heading-text">Browse Stocks</h5>
          <h6 className="symbols-text">Search by exchange name</h6>
          <form onSubmit={this.handleSubmit}>
            <div class="form-group">
              <label for="exampleInputEmail1">\</label>
              <input
                type="input"
                name="exchange"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <div
            style={
              this.state.returnedQuery
                ? { display: "none" }
                : { display: "block" }
            }
          >
            <p className="mt-4 company-text">{this.state.companyName}</p>
            <h5 className="d-inline-block share-text">
              ${this.state.sharePrice}
            </h5>
            <Button variant="success" className="buy-button" onClick={this.handleShow}>
              Buy shares
            </Button>
            <Modal show={this.state.setShow} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Woohoo, you're reading this text in a modal!
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPortal;
