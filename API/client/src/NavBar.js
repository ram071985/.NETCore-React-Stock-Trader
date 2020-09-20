import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import LandingPage from "./LandingPage";
import { User } from "react-feather";
import SignUp from "./SignUp";
import LogIn from "./LogIn"

class NavBar extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              TradeTopia
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Link
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link disabled"
                    href="#"
                    tabindex="-1"
                    aria-disabled="true"
                  >
                    Disabled
                  </a>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
              <Link to="/log-in"><button
                  className="btn btn-outline-success mr-2 my-2 my-sm-0"
                  type="submit"
                >
                  <User
                    className="ml-2 d-inline-block user-icon"
                    color="white"
                    width="15"
                    height="15"
                  />
                  <span className="log-in-button-text">Log in</span>
                </button></Link>
                <Link to="/sign-up"><button
                  className="btn btn-outline-success mr-3 my-2 my-sm-0"
                  type="submit"
                >
                  <span className="account-button-text">Start an account</span>
                </button></Link>
              </form>
            </div>
          </nav>
          <Switch>
            <Route path="/log-in">
              <LogIn />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/">
              <LandingPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default NavBar;
