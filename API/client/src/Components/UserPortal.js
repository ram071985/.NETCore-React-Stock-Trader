import React, { Component } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import ModalComponent from "./ModalComponent";

class UserPortal extends Component {
  constructor() {
    super();
    this.state = {
      sampleStock: [],
      priceResults: [],
      quantity: 0,
      dynamicQuantity: 0,
      price: 0,
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
      loading: false,
      isSearching: false,
      isSymbol: "",
      company: "",
      showError: "",
    };
  }

  componentDidMount() {
    this.getUserInfo();
    this.getDatabaseStocks();
  }

  getExchange = () => {
    axios
      .get("/api/stocks/exchanges/" + this.state.symbol, {})
      .then((res) => {
        this.setState({
          exchange: res.data,
          company: res.data.companyName,
          price: parseInt(res.data.latestPrice),
        });
        if (res.data === "Unknown symbol") {
          this.setState({
            isSymbol: "Unknown symbol",
          });
        } else {
          this.setState({
            isSymbol: "Known symbol",
          });
        }
      })
      .catch((err) => {});
  };

  handleQueryChange = (event) => {
    this.clearFields();
    this.setState({
      isSearching: true,
    });

    let returnInterval;
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    returnInterval = setInterval(() => {
      this.getExchange();
      if (returnInterval !== null) {
        clearInterval(returnInterval);
        this.setState({
          isSearching: false,
        });
      }

      return returnInterval;
    }, 2000);
    this.setState({
      isSearching: false,
    });
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
      isSymbol: "",
      isSearching: false,
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
    if (event.target.value === "Buy") {
      this.setState({
        company: "",
      });
    }
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
    this.setState({
      loading: true,
    });
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
    this.setState({
      loading: false,
    });
  };

  getSellQuantity = () => {
    const filter = this.state.stocks.filter(
      (name) => name.company === this.state.stockName
    );

    this.setState({
      sellQuantity: filter[0].quantity,
      loading: false,
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
      <div key={index} className="holdings-render">
        <p className="mb-0 company-text">{stock.company}</p>
        <h6 className="font-weight-normal shares-current">
          <span
            className="mt-1 d-block"
            style={{ color: "rgb(233, 233, 233)" }}
          >
            {stock.quantity} shares
          </span>
        </h6>
        <h5 className="font-weight-light d-inline-block share-text">
          $
          {this.state.loading ? (
            <Spinner className="ml-2" variant="success" animation="border" />
          ) : (
            this.decimalFormatter().format(stock.current * stock.quantity)
          )}
        </h5>
        <Button
          variant="outline-success"
          className="sell-button"
          onClick={(e) => this.sellSubmit(index)}
        >
          <span className="font-weight-light">Sell shares</span>
        </Button>
        <Button
          variant="outline-success"
          className="buy-button"
          onClick={(e) => this.buySubmit(index)}
        >
          <span className="font-weight-light">Buy shares</span>
        </Button>
      </div>
    );
  };

  sellSubmit = (index) => {
    this.setState({
      holding: this.state.stocks[index],
      isBuy: false,
      isSell: true,
      action: "Sell",
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
      action: "Buy",
      sellQuantity: this.state.stocks[index].quantity,
      price: this.state.stocks[index].current,
      company: this.state.stocks[index].company,
      symbol: this.state.stocks[index].symbol,
    });
    this.handleShow();
  };

  renderModalHoldings = (stock, index) => {
    return (
      <option key={index} value={stock.company}>
        {stock.company} ({stock.quantity} shares)
      </option>
    );
  };

  render() {
    console.log(this.state.setShow)
    const { loading } = this.state;

    return (
      <div className="container-fluid main-container">
        <Form onSubmit={(event) => this.handleLogOut(event)}>
          <Button
            type="submit"
            variant="outline-success"
            className="d-block ml-5 log-out-button"
          >
            Log out
          </Button>
        </Form>

        <div className="container-fluid d-block container user-container">
          <div className="d-block row">
            <h4 className="d-inline-block ml-3 mr-3 heading-text">
              User Information
            </h4>
            <Button
              onClick={this.handleShow}
              className="buy-sell-button"
              variant="success"
            >
              <span className="font-weight-light">Buy/Sell Stocks</span>
            </Button>{" "}
            <hr style={{ borderTop: "1px solid #1aac3c", width: "100%" }} />
            <ModalComponent
              action={this.state.action}
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
              holdings={this.state.holdings}
              isSearching={this.state.isSearching}
              isSymbol={this.state.isSymbol}
              wallet={this.state.wallet}
            />
            <div className="col-12">
              <h6 className="font-weight-normal d-inline-block mb-1 titles-text">
                User{" "}
              </h6>
              <h6 className="font-weight-light d-block mb-2 name-text">
                {loading ? (
                  <Spinner
                    className="ml-2"
                    variant="success"
                    animation="border"
                    size="sm"
                  />
                ) : (
                  this.state.username
                )}
              </h6>
              <h6
                id="holdings"
                className="font-weight-normal d-inline-block mb-1 titles-text"
              >
                Holdings:
              </h6>
              <h6
                id="holding-text"
                className="font-weight-light d-block mb-2 name-text"
              >
                $
                {loading ? (
                  <Spinner
                    className="ml-2"
                    variant="success"
                    animation="border"
                    size="sm"
                  />
                ) : (
                  this.decimalFormatter().format(this.state.holdings)
                )}
              </h6>
            </div>
            <div className="col-5">
              <h6
                id="wallet"
                className="font-weight-normal d-inline-block mb-1 titles-text"
              >
                Wallet
              </h6>
              <h6 className="font-weight-light name-text mb-2">
                $
                {loading ? (
                  <Spinner
                    className="ml-2"
                    variant="success"
                    animation="border"
                    size="sm"
                  />
                ) : (
                  this.decimalFormatter().format(this.state.wallet)
                )}
              </h6>
            </div>
          </div>
        </div>
        <div className="container-fluid d-block holdings-container">
          <h4 className="heading-text">Current Holdings</h4>
          <hr style={{ borderTop: "1px solid #1aac3c", width: "100%" }} />
          {this.state.stocks.map(this.renderHoldings)}
        </div>
      </div>
    );
  }
}

export default UserPortal;
