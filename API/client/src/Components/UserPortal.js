import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { PlusSquare, MinusSquare } from "react-feather";
import ModalComponent from "./ModalComponent";
import ConfirmOrderModal from "./ConfirmOrderModal";

class UserPortal extends Component {
  constructor() {
    super();
    this.state = {
      sampleStock: [],
      priceResults: [],
      action: "",
      stocks: [],
      sellQuantity: 0,
      stockName: "",
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
      isSell: false,
    };
  }

  componentDidMount() {
    this.setState({
      action: "Buy"
    });
    //this.getUserInfo();
    this.getDatabaseStocks();

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

  handleBuySellShow = () => {
    this.setState({
      setShow: true,
      selectValue: "Buy",
    });
  };

  handleShow = () => {
    this.setState({
      setShow: true,
      action: "Buy"
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

  getDatabaseStocks = async () => {
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    const stocksResponse = await axios.post("/api/update-portal/stocks", {
      userId: parseUserId,
    });

    this.setState({
      stocks: stocksResponse.data,
    });
    for (const item of stocksResponse.data) {
      const newResult = await axios.get("/api/stocks/exchanges/" + item.symbol);
      const obj = { ["current"]: newResult.data.latestPrice };
      this.state.sampleStock.push(obj);
    }

    const addPrices = this.state.stocks.map((price, index) => {
      return { ...price, current: this.state.sampleStock[index].current };
    });
    this.setState({
      stocks: addPrices,
    });
    console.log(this.state.stocks[0].company);
    this.setState({
      stockName: this.state.stocks[0].company,
    });
    this.getSellQuantity();


  };

  getUpdatedPrices = () => {
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    const prices = [];
    for (const symbol of this.state.stocks) {
      axios.post("api/stocks/exchanges/", {});
    }
  };

  checkForCompany = () => {
    return "Facebook, Inc";
  };

  getSellQuantity = (index) => {
    const filter = this.state.stocks.filter(
      (name) => name.company === this.state.stockName
    );

    this.setState({
      sellQuantity: filter[0].quantity,
    });
  };

  render() {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const holdings = this.state.stocks.map((stock, index) => (
      <div key={index}>
        <p className="mt-4 company-text">{stock.company}</p>
        <h6 className="shares-current">
          Shares: <span>{stock.quantity}</span>
        </h6>
        <h5 className="d-inline-block share-text">
          ${formatter.format(stock.current * stock.quantity)}
        </h5>
        <Button
          variant="success"
          className="buy-button"
          onClick={this.handleSellSubmit}
        >
          Sell shares
        </Button>
      </div>
    ));

    return (
      <div className="container-fluid main-container">
        <div className="d-inline-block container user-container">
          <div className="d-block row">
            <h4 className="d-inline-block ml-3 mr-5 heading-text">
              User Information
            </h4>
            <Button
              onClick={this.handleShow}
              className=""
              variant="outline-success"
            >
              Buy/Sell Stocks
            </Button>{" "}
            <ModalComponent
              selectValue={this.state.selectValue}
              setAction={this.state.action}
              isSell={this.state.isSell}
              show={this.state.setShow}
              onHide={this.handleClose}
              stocks={this.state.stocks}
              stockName={this.state.stockname}
              quantity={this.state.sellQuantity}
            />
            <div className="col-12">
              <h5 className="d-inline-block mb-2 titles-text">Name</h5>
              <h6 className="d-block mb-4 name-text">{this.state.username}</h6>
              <h5 id="holdings" className="d-inline-block mb-2 titles-text">
                Holdings
              </h5>
              <h6 id="holding-text" className="d-block mb-4 name-text">
                ${this.state.holdings}
              </h6>
            </div>
            <div className="col-5">
              <h5 id="wallet" className="d-inline-block mb-2 titles-text">
                Wallet
              </h5>
              <h6 className="name-text mb-4">${this.state.wallet}</h6>
            </div>
          </div>
        </div>
        <div className="container-fluid d-inline-block holdings-container">
          <h4 className="heading-text">Current Holdings</h4>
          {holdings}
        </div>
      </div>
    );
  }
}

export default UserPortal;
