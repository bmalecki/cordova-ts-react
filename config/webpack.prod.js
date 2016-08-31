const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const commonConfig = require("./webpack.common");
const helpers = require("./helpers");

const ENV = process.env.NODE_ENV = process.env.ENV = "production";

module.exports = webpackMerge(commonConfig, {
  devtool: "source-map",

  output: {
    path: helpers.root("www"),
    publicPath: undefined,
    filename: "[name].[chunkhash].js",
    chunkFilename: "[id].[chunkhash].chunk.js"
  },

  plugins: [
    new webpack.NoErrorsPlugin(),

    new WebpackMd5Hash(),

    new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    new ExtractTextPlugin("[name].[hash].css"),

    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(ENV),
      "process.env.ENV": JSON.stringify(ENV)
    }),

    new webpack.optimize.AggressiveMergingPlugin()
  ]
});
