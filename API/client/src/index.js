import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import UserPortal from "./Components/UserPortal";
import ConfirmOrder from "./Components/ConfirmOrder";
import ProtectedRoute from "./Components/ProtectedRoute";
import HistoricalData from "./Components/HistoricalData";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Switch>
        <Route
          path="/historical-data"
          render={(props) => <HistoricalData {...props} />}
        />
        <Route
          path="/confirm"
          render={(props) => <ConfirmOrder {...props} />}
        />
        <Route path="/sign-up" render={(props) => <SignUp {...props} />} />
        <Route path="/log-in" render={(props) => <LogIn {...props} />} />
        <Route path="/landing-page" component={LandingPage} />
        <ProtectedRoute exact={true} path="/" component={UserPortal} />
        <ProtectedRoute component={UserPortal} />
      </Switch>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
