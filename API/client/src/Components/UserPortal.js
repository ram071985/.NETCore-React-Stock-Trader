import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalComponent from "./ModalComponent";

class UserPortal extends Component {
  constructor() {
    super();
    this.state = {
      sampleStock: [],
      priceResults: [],
      quantity: 0,
      dynamicQuantity: 0,
      holding: [],
      firstObject: [],
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
      isBuy: false,
      sellSubmit: false,
      buySubmit: false,
      sellInput: 1,
      isHoldings: false,
    };
  }

  componentDidMount() {
    //this.getUserInfo();
    this.getDatabaseStocks();
  }

  getExchange = () => {
    axios
      .get("/api/stocks/exchanges/" + this.state.symbol, {})
      .then((res) => {
        this.setState({
          exchange: res.data,
          company: res.data.companyName,
          price: res.data.latestPrice,
        });
      })
      .catch((err) => {});
  };

  handleQueryChange = (event) => {
    this.clearFields();
    let returnInterval;
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    returnInterval = setInterval(() => {
      this.getExchange();
      if (returnInterval !== null) {
        clearInterval(returnInterval);
      }
      return returnInterval;
    }, 2000);
  };

  getQuantity = () => {
    this.setState({
      firstObject: this.state.stocks[0],
    });
    if (this.state.action === "Sell") {
      this.setState({
        sellQuantity: this.state.firstObject.quantity,
      });
    }
  };

  parseId = () => {
    let parseUserId = parseInt(localStorage.getItem("user_id"));
    return parseUserId;
  };

  handleLogOut = (event) => {
    let deleteId = localStorage.clear();
    return deleteId;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: "",
    });
  };

  handleHoldings = (event, index) => {
    const result = this.state.stocks.filter(
      (name) => name.company === event.target.value
    );
    this.setState({
      sellQuantity: result[0].quantity,
      isHoldings: true,
      price: result[0].current,
      company: result[0].company,
      symbol: result[0].symbol,
    });
  };

  handleBuyQuantity = (event) => {
    const { name, value } = event.target;
    this.setState({
      dynamicQuantity: parseInt(value),
    });
  };

  handleQuantityChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: this.state.sellQuantity,
    });
    this.setState({
      dynamicQuantity: parseInt(value),
    });
  };

  handleCompanyList = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  clearFields = () => {
    this.setState({
      sellQuantity: 0,
      price: 0,
      company: "",
      dynamicQuantity: 0,
      company: "",
    });
  };

  handleBuySellChange = (event) => {
    this.clearFields();
    this.setState({
      action: event.target.value,
      sellQuantity: this.state.firstObject.quantity,
      price: this.state.firstObject.current,
      company: this.state.firstObject.company,
      symbol: this.state.firstObject.symbol,
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
    this.clearFields();
    this.setState({
      setShow: false,
      setSell: true,
      isSell: false,
      isBuy: false,
      price: 0,
      company: "",
    });
  };

  getUserInfo = () => {
    axios
      .post("/api/update-portal", {
        userId: this.parseId(),
      })
      .then((res) => {
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
      return { ...price, current: this.state.sampleStock[index].current };
    });
    this.setState({
      stocks: addPrices,
    });
    this.getQuantity();
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
          onClick={(e) => this.sellSubmit(index)}
        >
          Sell shares
        </Button>
        <Button
          variant="success"
          className="buy-button"
          onClick={(e) => this.buySubmit(index)}
        >
          Buy shares
        </Button>
      </div>
    );
  };

  sellSubmit = (index) => {
    this.setState({
      holding: this.state.stocks[index],
      isBuy: false,
      isSell: true,
      sellQuantity: this.state.stocks[index].quantity,
      price: this.state.stocks[index].current,
      company: this.state.stocks[index].company,
      symbol: this.state.stocks[index].symbol,
    });
    this.handleSellShow();
  };

  buySubmit = (index) => {
    this.setState({
      holding: this.state.stocks[index],
      isSell: false,
      isBuy: true,
      sellQuantity: this.state.stocks[index].quantity,
      price: this.state.stocks[index].current,
      company: this.state.stocks[index].company,
      symbol: this.state.stocks[index].symbol,
    });
    this.handleSellShow();
  };

  renderModalHoldings = (stock, index) => {
    return (
      <option key={index} value={stock.company}>
        {stock.company} ({stock.quantity} shares)
      </option>
    );
  };

  render() {
    return (
      <div className="container-fluid main-container">
        <Form onSubmit={(event) => this.handleLogOut(event)}>
          <Button
            type="submit"
            variant="outline-success"
            className="d-block ml-5"
          >
            Log out
          </Button>
        </Form>

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
              isBuy={this.state.isBuy}
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
              isHoldings={this.state.isHoldings}
              sellInput={this.state.sellInput}
              holding={this.state.holding}
              firstObject={this.state.firstObject}
              handleBuyQuantity={this.handleBuyQuantity}
              dynamicQuantity={this.state.dynamicQuantity}
              handleQueryChange={this.handleQueryChange}
              company={this.state.company}
              price={this.state.price}
              symbol={this.state.symbol}
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
