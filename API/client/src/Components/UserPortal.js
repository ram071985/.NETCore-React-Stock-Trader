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
      holding: [],
      holdingName: "",
      action: "",
      setSell: false,
      stocks: [],
      sellQuantity: 1,
      stockName: "",
      username: "",
      wallet: 0,
      balance: 0,
      holdings: 0,
      exchange: "",
      symbol: "",
      companyName: "",
      sharePrice: 0,
      companyValue: "",
      userId: 0,
      errorMessage: "",
      returnedQuery: false,
      setShow: false,
      isSell: false,
      sellSubmit: false,
    };
  }

  componentDidMount() {
    //this.getUserInfo();
    this.getDatabaseStocks();
  }

  parseId = () => {
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    return parseUserId;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: "",
    });
  };

  handleHoldings = (event, index) => {
    console.log(event.target.value);
    const result = this.state.stocks.filter(name => name.company === event.target.value);
    console.log(result)
  
  };

  handleQuantityChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: parseInt(value),
    });
    console.log(this.state.quantity);
  };

  handleCompanyList = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleBuySellChange = (event) => {
    console.log(event.target.value);
    this.setState({
      action: event.target.value,
    });
  };

  handleBuySellShow = () => {
    this.setState({
      setShow: true,
    });
  };

  handleSellSubmit = () => {
    this.setState({
      action: "Sell",
      setShow: true,
      sellSubmit: true,
    });
  };

  handleShow = () => {
    this.setState({
      setShow: true,
      action: "Buy",
      sellSubmit: false,
    });
  };

  handleSellShow = () => {
    this.setState({
      setShow: true,
      action: "Sell",
      sellSubmit: true,
    });
  };

  handleClose = () => {
    this.setState({
      setShow: false,
      setSell: true,
    });
  };

  getUserInfo = () => {
    axios
      .post("/api/update-portal", {
        userId: this.parseId(),
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

  getDatabaseStocks = async (index) => {
    const stocksResponse = await axios.post("/api/update-portal/stocks", {
      userId: this.parseId(),
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
      console.log(index)
      return { ...price, current: this.state.sampleStock[index].current };
    });
    this.setState({
      stocks: addPrices,
    });
    this.pooPoo();
  };

  getSellQuantity = () => {
    const filter = this.state.stocks.filter(
      (name) => name.company === this.state.stockName
    );

    this.setState({
      sellQuantity: filter[0].quantity,
    });
  };

  decimalFormatter = () => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter;
  };

  renderHoldings = (stock, index) => {
    return (
      <div key={index}>
        <p className="mt-4 company-text">{stock.company}</p>
        <h6 className="shares-current">
          Shares: <span>{stock.quantity}</span>
        </h6>
        <h5 className="d-inline-block share-text">
          ${this.decimalFormatter().format(stock.current * stock.quantity)}
        </h5>
        <Button
          variant="success"
          className="buy-button"
          onClick={(e) => this.fooSubmit(index)}
        >
          Sell shares
        </Button>
      </div>
    );
  };

  fooSubmit = (index) => {
    this.setState({
      holding: this.state.stocks[index],
    });
    this.handleSellShow();
    //this.setState({
    //  companyValue: filter.company
    // })
    //return filter;
  };

  renderModalHoldings = (stock, index) => {
    console.log(index);
    return (
      <option key={index} value={stock.company}>
        {stock.company} ({stock.quantity} shares)
      </option>
    );
  };

  pooPoo = (index) => {
    const map = this.state.stocks.map((index) => {
    console.log([index])
    });
  
   
  };

  render() {
    console.log(this.state.stocks);
    console.log(this.state.holdingName);
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
              setSell={this.state.setSell}
              selectValue={this.state.selectValue}
              setAction={this.state.action}
              isSell={this.state.isSell}
              show={this.state.setShow}
              onHide={this.handleClose}
              stocks={this.state.stocks}
              stockName={this.state.stockname}
              quantity={this.state.sellQuantity}
              handleChange={this.handleBuySellChange}
              sellSubmit={this.state.sellSubmit}
              companyList={this.state.companyList}
              renderHoldings={this.renderHoldings}
              formatter={this.decimalFormatter}
              handleHoldings={this.handleHoldings}
              modalHoldings={this.renderModalHoldings}
              quantityChange={this.handleQuantityChange}
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
          {this.state.stocks.map(this.renderHoldings)}
        </div>
      </div>
    );
  }
}

export default UserPortal;
