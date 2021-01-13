import React, { Component } from "react";
import { Button, Row, Form } from "react-bootstrap";
import axios from "axios";
import { Redirect, RouteComponentProps, NavLinkProps } from "react-router-dom";
import AlertComponent from "./AlertComponent";
import BarLoader from "react-spinners/BarLoader";
const lsComponenet = require("./ParseLSComponent");

interface IConfirmOrder {
  localStorage: string
}

class ConfirmOrder extends Component<IConfirmOrder & RouteComponentProps & NavLinkProps<any>, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      errorMessage: "",
      cancel: false,
      setShow: false,
      isError: false,
      redirect: false,
    };
  }

  handleChange = (event: React.ChangeEvent<any>) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleAlertClose = () => {
    this.setState({
      setShow: false,
    });
  };

  handleClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setState({
      cancel: true,
    });
  };

  putStockTransaction = () => {
    if (
      this.props.location.state.action === "Buy" ||
      this.props.location.state.isBuy
    ) {
      axios
        .put("/api/transaction/buy", {
          userId: lsComponenet.parseLocalStorage(),
          balance:
            this.props.location.state.price *
            this.props.location.state.quantity,
        })

        .catch((err) => {
          if (err.response.data.detail === "insufficient balance") {
            this.setState({
              errorMessage:
                "You have insufficient funds for this purpose. Please try another order.",
              setShow: true,
            });
          }
        });
    }
    if (
      this.props.location.state.action === "Sell" ||
      this.props.location.state.isSell
    ) {
      axios
        .put("/api/transaction/sell", {
          userId: lsComponenet.parseLocalStorage(),
          balance:
            this.props.location.state.price *
            this.props.location.state.quantity,
        })
        .catch((err) => { });
    }
  };

  postNewDepositTransaction = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.putStockTransaction();
    axios
      .post("/api/transaction/sell", {
        userId: lsComponenet.parseLocalStorage(),
        deposit:
          this.props.location.state.price * this.props.location.state.quantity,
        quantity: this.props.location.state.quantity,
        exchange: this.props.location.state.symbol,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            loading: false,
            redirect: true,
          });
        }
      })
      .catch((err) => { });
    this.deleteStockRecord();
  };

  postNewWithdrawalTransaction = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.putStockTransaction();
    axios
      .post("/api/transaction/buy", {
        userId: lsComponenet.parseLocalStorage(),
        withdrawal:
          this.props.location.state.price * this.props.location.state.quantity,
        quantity: this.props.location.state.quantity,
        exchange: this.props.location.state.symbol,
      })
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            loading: false,
            redirect: true,
          });
        }
      })
      .catch((err) => { });
    this.addStockRecord();
  };

  addStockRecord = () => {
    if (!this.state.isError) {
      axios.post("/api/transaction/add-stock", {
        userId: lsComponenet.parseLocalStorage(),
        company: this.props.location.state.company,
        symbol: this.props.location.state.symbol,
        quantity: this.props.location.state.quantity,
      });
    }
  };

  deleteStockRecord = () => {
    axios.post("/api/transaction/delete-stock", {
      userId: lsComponenet.parseLocalStorage(),
      company: this.props.location.state.company,
      symbol: this.props.location.state.symbol,
      quantity: this.props.location.state.quantity,
    });
  };

  decimalFormatter = () => {
    const formatter = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formatter;
  };

  renderAlert = () => {
    if (this.state.errorMessage !== "") {
      return (
        <AlertComponent
          setShow={this.state.setShow}
          handleClose={() => this.handleAlertClose()}
          logInErrorMessage={this.state.errorMessage}
        />
      );
    }
  };

  parseLocalStorage = async () => {
    return lsComponenet.parseLocalStorage();
  }

  render() {
    if (this.state.cancel || this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/user-portal",
          }}
        />
      );
    }
    const { loading } = this.state;
    return (
      <div
        style={{ color: "white", opacity: "0.85" }}
        className="justify-content-center"
      >
        <h6 className="font-weight-normal mt-5 text-center">
          {this.props.location.state.company}
          <span>( </span>
          <span className="text-uppercase special-characters">
            {this.props.location.state.symbol}
          </span>
          <span> )</span>
        </h6>
        <h6 className="font-weight-normal text-center">
          Quantity
          {this.props.location.state.isSell ||
            this.props.location.state.action === "Sell"
            ? " Sold"
            : ""}
          : {this.props.location.state.quantity}
        </h6>
        <h6 className="font-weight-normal text-center">
          Price: $
          {this.decimalFormatter().format(this.props.location.state.price)}
        </h6>
        <hr style={{ borderTop: "1px solid white", width: "75%" }} />
        <h2 className="text-center mt-5">Order Summary</h2>
        <h6 className="font-weight-bold text-center mt-2">
          Subtotal:
          <span className="font-weight-normal text-center confirm-span">
            ${this.props.location.state.price} x{" "}
            {this.props.location.state.quantity} (
            <span className="special-characters"> shares </span>) = $
            {this.decimalFormatter().format(
              this.props.location.state.quantity *
              this.props.location.state.price
            )}
          </span>
        </h6>
        <hr></hr>
        <h5 className="text-center">
          Total:
          <span className="font-weight-normal text-center confirm-span">
            $
            {this.decimalFormatter().format(
          this.props.location.state.quantity *
          this.props.location.state.price
        )}
          </span>
        </h5>
        <Row className="justify-content-center">
          {" "}
          <Form
            className="justify-content-center"
            onSubmit={
              this.props.location.state.action === "Buy"
                ? this.postNewWithdrawalTransaction
                : this.postNewDepositTransaction
            }
          >
            <Button
              className="mx-auto confirm-order-button"
              variant="secondary"
              type="submit"
            >
              Confirm
            </Button>{" "}

            <Button
              className="d-inline-block mx-auto cancel-confirm-button"
              variant="danger"
              onClick={(e) => this.handleClose(e)}
              type="button"
            >
              Cancel
          </Button>{" "}
          </Form>
        </Row>

        {this.renderAlert()}
        <div className="container-fluid">
          {loading ? (
            <div>
              <p className="mt-3 text-center">
                Processing order... Redirecting to User Portal.
              </p>{" "}
              <BarLoader />
            </div>
          ) : (
              <div></div>
            )}
        </div>
      </div>
    );
  }
}

export default ConfirmOrder;
