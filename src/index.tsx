import "babel-polyfill";

import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk';
import {Router, Route, hashHistory as _history} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';

import configureStore from './store/configureStore';
import {App} from './components/App';


class MyApp {
  initialize() {
    this.bindEvents();

    require('./style/app.scss');

    //apply middleware in array
    const store = configureStore([
      routerMiddleware(_history), thunk  
    ]);
    const history = syncHistoryWithStore(_history, store);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
          </Route>
        </Router>
      </Provider>,
      document.getElementById('app')
    );
  }

  bindEvents() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  }

  onDeviceReady() {
    console.log('Ready');
  }
};

let app = new MyApp();
app.initialize();
