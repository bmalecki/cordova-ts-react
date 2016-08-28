declare var module: any;
declare const process: {env: {NODE_ENV: String}};

interface IConfigureStore{
  (middleware: Array<Redux.Middleware>, preloadedState ?: any) : Redux.Store<any>;
}

let configureStore: IConfigureStore;

if (process.env.NODE_ENV === "production") {
  configureStore = require("./configureStore.prod").default;
} else {
  configureStore = require("./configureStore.dev").default;
}

export default configureStore;
