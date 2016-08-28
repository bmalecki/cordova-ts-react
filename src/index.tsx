import "babel-polyfill";

import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import thunk from "redux-thunk";
import {Route, Router, hashHistory as _history} from "react-router";
import {syncHistoryWithStore, routerMiddleware} from "react-router-redux";

import configureStore from "./store/configureStore";
import {App} from "./components/App";

declare var process: any;
class MyApp {
  public initialize() {
    this.bindEvents();

    require("./style/app.scss");

    if (process.env.NODE_ENV !== "production") {
      require("raw!./index.ejs");
    }

    // apply middleware in array
    const store = configureStore([
      routerMiddleware(_history), thunk]);
    const history = syncHistoryWithStore(_history, store);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
          </Route>
        </Router>
      </Provider>,
      document.getElementById("app")
    );
  }

  private bindEvents() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  }

  private onDeviceReady() {
    console.log("Ready");
  }
};

let app = new MyApp();
app.initialize();
