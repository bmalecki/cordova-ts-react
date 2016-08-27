var open = require("open");
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var helpers = require('./helpers');
var config = require('./webpack.dev');

var app = new (require('express'))();
var port = 3000;

var hotReloadEntry = [
  `webpack-hot-middleware/client?http://localhost:${port}&reload=true/`,
  "webpack/hot/dev-server"
  ];

for(prop in config.entry){
  config.entry[prop].unshift(...hotReloadEntry);
}

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get('*',function(req, res) {
  res.sendFile(helpers.root('src') + '/index.ejs')
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
});

open(`http://localhost:${port}`);
