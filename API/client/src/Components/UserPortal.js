import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { PlusSquare, MinusSquare } from "react-feather";

class UserPortal extends Component {
  constructor() {
    super();
    this.state = {
      stocks: [],
      username: "",
      wallet: 0,
      balance: 0,
      holdings: 0,
      exchange: "",
      symbol: "",
      companyName: "Facebook Inc",
      sharePrice: 0,
      userId: 0,
      errorMessage: "",
      returnedQuery: false,
      setShow: false,
    };
  }

  componentDidMount() {
    this.setState({});
    this.getUserInfo();
    //this.getStock();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: "",
    });
  };

  handleCompanyList = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
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

  getUserInfo = () => {
    let parseId = parseInt(localStorage.getItem("user_id"));
    axios
      .post("/api/update-portal", {
        userId: parseId,
      })
      .then((res) => {
        console.log(res.data);
        this.setState({
          username: res.data.username,
          wallet: res.data.balance,
          holdings: res.data.holdings,
        });
      });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.getStock();
  };

  getStock = () => {
    axios
      .get("/api/stocks/all", {})
      .then((res) => {
        console.log(res.data);
        this.setState({
          stocks: res.data,
        });
      })
      .catch((err) => {});
  };

  render() {
    const stocks = this.state.stocks.map((stock, index) => (
      <option key={index} value={stock.name} />
    ));

    return (
      <div className="container-fluid main-container">
        <div className="container user-container">
          <div className="d-block row">
            <h6 className="ml-3 heading-text">User Information</h6>
            <div className="col-12">
              <h6 className="d-inline-block mb-1 titles-text">Name</h6>
              <h6 className="d-block mb-1 name-text">{this.state.username}</h6>
              <h6 id="holdings" className="d-inline-block mb-1 titles-text">
                Holdings
              </h6>
              <h6 id="holding-text" className="d-block mb-1 name-text">
                ${this.state.holdings}
              </h6>
            </div>
            <div className="col-5">
              <h6 id="wallet" className="d-inline-block mb-1 titles-text">
                Wallet
              </h6>
              <h6 className="name-text">${this.state.wallet}</h6>
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
              <input
                type="input"
                list="data"
                name="exchange"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={this.handleChange}
              />
              <datalist id="data">{stocks}</datalist>
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
            <Button
              variant="success"
              className="buy-button"
              onClick={this.handleShow}
            >
              Buy shares
            </Button>
            <Modal
              classname="purchase-modal"
              show={this.state.setShow}
              onHide={this.handleClose}
            >
              <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label className="ml-5 mb-0 mt-5">Action</Form.Label>
                  <Form.Control
                    as="select"
                    defaultValue="Choose..."
                    className="ml-5 mt-0 modal-input w-50"
                  >
                    <option>Buy</option>
                    <option>Sell</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label className="mt-5 mb-0">
                    Search by company symbol
                  </Form.Label>
                  <Form.Control type="input" className="w-75 modal-input" />
                </Form.Group>
              </Form.Row>
              <Form.Row autocomplete="off">
                <Form.Group as={Col} controlId="formGridZip" className="quanity-col">
                  <Form.Label className="ml-5 mt-3 mb-0">
                    Share quantity
                  </Form.Label>
                  <Form.Control type="number" min="1" className="w-50 ml-5 d-inline-block modal-input" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label className="ml-1 mt-3 mb-0">Total</Form.Label>
                  <Form.Control type="text" className="w-50 ml-1 modal-input" />
                </Form.Group>
              </Form.Row>
              <br />
              <hr />
              <h6 className="text-center">Your Order is not complete yet. Review and confirm your order in the next step.</h6>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPortal;
