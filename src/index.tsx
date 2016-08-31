import "babel-polyfill";

import * as React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import thunk from "redux-thunk";
import {Route, Router, hashHistory as _history} from "react-router";
import {syncHistoryWithStore, routerMiddleware} from "react-router-redux";

import configureStore from "./store/configureStore";
import {App} from "./components/App";

declare const process: any;
declare const navigator: {
  splashscreen: any,
  Backbutton: any
};

class MyApp {
  public initialize() {
    document.addEventListener("deviceready", () => this.onDeviceReady(), false);

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

  private onDeviceReady() {
    this.hideSplashScreen();
    console.log("Ready");
    document.addEventListener("backbutton", () => this.onBackbuttonClick(), false);
  }

  private hideSplashScreen() {
    if (navigator.splashscreen) {
      setTimeout(() => {
          navigator.splashscreen.hide();
      }, 200);
    }
  }

  private onBackbuttonClick() {
    navigator.Backbutton.goBack();
  }

};

let app = new MyApp();
app.initialize();
