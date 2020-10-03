import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserPortal from "./Components/UserPortal";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    <Route path="/sign-up" component={SignUp} />
      <Route path="/log-in" component={LogIn} />
      <Route path="/" component={UserPortal}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
