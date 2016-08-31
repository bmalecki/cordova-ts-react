declare var module: any;
declare var window: {devToolsExtension: Function};

import { createStore, compose , applyMiddleware } from "redux";
import rootReducer from "../reducers";

export default function configureStore(middleware = [], preloadedState) {
  const store = createStore(rootReducer, preloadedState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers    
    module.hot.accept("../reducers", () => {
      const nextReducer = require("../reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
