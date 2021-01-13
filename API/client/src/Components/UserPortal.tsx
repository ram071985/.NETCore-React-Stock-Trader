import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Spinner } from "react-bootstrap";
import ModalComponent from "./ModalComponent";
import UserInfo from "./UserInfo";
const lsComponent = require("./ParseLSComponent");

interface IUserPortal {
  props: any
}

class UserPortal extends Component<IUserPortal, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      sampleStock: [],
      quantity: 0,
      dynamicQuantity: 0,
      price: 0,
      holding: [],
      firstObject: [],
      action: "",
      stocks: [],
      sellQuantity: 1,
      stockName: "",
      username: "",
      wallet: 0,
      balance: 0,
      holdings: 0,
      symbol: "",
      errorMessage: "",
      setShow: false,
      isSell: false,
      isBuy: false,
      sellSubmit: false,
      loading: false,
      isSearching: false,
      isSymbol: "",
      company: "",
      showError: "",
      setAlertShow: false,
      isConfirm: false,
    };
  }

  componentDidMount() {
    this.getUserInfo();
    this.getDatabaseStocks();
  }

  getExchange = () => {
    if (this.state.symbol !== "") {
      axios
        .get("/api/stocks/exchanges/" + this.state.symbol, {})
        .then((res) => {
          this.setState({
            exchange: res.data,
            company: res.data.companyName,
            price: res.data.latestPrice,
          });
          if (
            res.data === "Unknown symbol" ||
            res.data.companyName === "" ||
            res.data === "Not found"
          ) {
            this.setState({
              isSymbol: "Unknown symbol",
            });
          } else {
            this.setState({
              isSymbol: "Known symbol",
            });
          }
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.clearFields();
            this.setState({
              isSymbol: "Unknown symbol",
              price: 0,
            });
          }
        });
    }
  };

  handleQueryChange = (event: React.ChangeEvent<any>) => {
    this.clearFields();
    this.setState({
      isSearching: true,
      setAlertShow: false,
    });
    let returnInterval: any;
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      errorMessage: "",
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

  handleLogOut = (event?: React.FormEvent<HTMLElement>) => {
    let deleteId = localStorage.clear();
    return deleteId;
  };

  handleHoldings = (event: React.ChangeEvent<HTMLFormElement>) => {
    const result = this.state.stocks.filter(
      (name: any) => name.company === event.target.value
    );
    this.setState({
      sellQuantity: result[0].quantity,
      isHoldings: true,
      price: result[0].current,
      company: result[0].company,
      symbol: result[0].symbol,
    });
  };

  handleBuyQuantity = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { value } = event.target;
    this.setState({
      dynamicQuantity: parseInt(value),
      errorMessage: "",
    });
  };

  handleQuantityChange = (event: React.ChangeEvent<HTMLFormElement>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: this.state.sellQuantity,
      setAlertShow: false,
    });
    this.setState({
      dynamicQuantity: parseInt(value),
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

  handleBuySellChange = (event: React.ChangeEvent<HTMLFormElement>) => {
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

  handleClose = (e: React.MouseEvent<HTMLFormElement>) => {
    this.clearFields();
    this.setState({
      setShow: false,
      setSell: true,
      isSell: false,
      isBuy: false,
      price: 0,
      company: "",
      errorMessage: "",
    });
  };

  getUserInfo = () => {
    axios
      .post("/api/update-portal", {
        userId: lsComponent.parseLocalStorage(),
      })
      .then((res) => {
        this.setState({
          username: res.data.username,
          wallet: res.data.balance,
          holdings: res.data.holdings,
        });
      });
  };

  getDatabaseStocks = async () => {
    this.setState({
      loading: true,
    });
    const stocksResponse = await axios.post("/api/update-portal/stocks", {
      userId: lsComponent.parseLocalStorage,
    });

    this.setState({
      stocks: stocksResponse.data,
    });
    for (const item of stocksResponse.data) {
      const newResult = await axios.get("/api/stocks/exchanges/" + item.symbol);
      const obj = { ["current"]: newResult.data.latestPrice };
      this.state.sampleStock.push(obj);
    }

    const addPrices = this.state.stocks.map((price: Array<any>, index: number) => {
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
      (name: any) => name.company === this.state.stockName
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

  renderHoldings = (stock: any, index: number) => {
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
          <span id="holdings-button-text" className="font-weight-light">
            Sell shares
          </span>
        </Button>
        <Button
          variant="outline-success"
          className="buy-button"
          onClick={(e) => this.buySubmit(index)}
        >
          <span id="holdings-button-text" className="font-weight-light">
            Buy shares
          </span>
        </Button>
      </div>
    );
  };

  sellSubmit = (index: number) => {
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

  buySubmit = (index: number) => {
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

  renderModalHoldings = (stock: any, index: number) => {
    return (
      <option key={index} value={stock.company}>
        {stock.company} ({stock.quantity} shares)
      </option>
    );
  };

  confirmRedirect = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      this.state.symbol === "" ||
      (this.state.quantity === "" && this.state.action == "Buy")
    ) {
      this.setState({
        setAlertShow: true,
        errorMessage: "Stock symbol and quantity cannot be empty.",
      });
    } else if (
      this.state.wallet <
      parseFloat(this.state.price) * this.state.dynamicQuantity &&
      !this.state.isSell &&
      this.state.action === "Buy"
    ) {
      this.setState({
        setAlertShow: true,
        errorMessage:
          "Insufficient funds. Sell holdings or choose smaller share amount.",
      });
    } else {
      this.setState({
        isConfirm: true,
      });
    }
  };

  render() {
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
        <UserInfo
          handleShow={this.handleShow}
          wallet={this.state.wallet}
          holdings={this.state.holdings}
          username={this.state.username}
          loading={this.state.loading}
          formatter={this.decimalFormatter}
        />
        <ModalComponent
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
          holding={this.state.holding}
          formatter={this.decimalFormatter}
          handleHoldings={this.handleHoldings}
          modalHoldings={this.renderModalHoldings}
          quantityChange={this.handleQuantityChange}
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
          setAlertShow={this.state.setAlertShow}
          errorMessage={this.state.errorMessage}
          confirmRedirect={this.confirmRedirect}
          isConfirm={this.state.isConfirm}
        />
        <div className="container-fluid d-block holdings-container">
          <h4 className="heading-text">Current Holdings</h4>
          <hr
            className="mb-1"
            style={{ borderTop: "1px solid #1aac3c", width: "100%" }}
          />
          {this.state.stocks.length > 0 ? (
            this.state.stocks.map(this.renderHoldings)
          ) : (
              <p className="text-center no-holdings">No holdings yet!</p>
            )}
        </div>
      </div>
    );
  }
}

export default UserPortal;
