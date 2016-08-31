const open = require("open");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const helpers = require("./helpers");
const config = require("./webpack.dev");
const Express = require("express");

const app = new Express();
const port = 3000;

const hotReloadEntry = [
  `webpack-hot-middleware/client?http://localhost:${port}&reload=true/`,
  "webpack/hot/dev-server"
];

for(const prop in config.entry) {
  config.entry[prop].unshift(...hotReloadEntry);
}

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("*", (req, res) => {
  res.sendFile(`${helpers.root("src")}${"/index.ejs"}`);
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});

open(`http://localhost:${port}`);
