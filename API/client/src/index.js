import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import UserPortal from "./Components/UserPortal";
import ConfirmOrder from "./Components/ConfirmOrder";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    <Route path="/confirm" render={(props) => <ConfirmOrder {...props}/>} />
    <Route path="/user-portal" component={UserPortal} />
    <Route path="/sign-up" component={SignUp} />
      <Route path="/log-in" component={LogIn} />
      <Route path="/" component={LandingPage}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
