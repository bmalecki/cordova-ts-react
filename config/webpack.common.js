const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BowerWebpackPlugin = require("bower-webpack-plugin");
const autoprefixer = require("autoprefixer");
const helpers = require("./helpers");

module.exports = {
  entry: {
    vendor: ["./src/vendor.ts"],
    app: ["./src/index.tsx"]
  },

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", "jsx"]
  },

  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loader: "source-map"
      }
    ],

    loaders: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader!ts-loader",
        include: helpers.root("src")
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: helpers.root("src")
      },
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: "file?name=asset/[name][sha512:hash:base64:32].[ext]"
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css?sourceMap")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style", "css?sourceMap!postcss-loader?sourceMap!sass?sourceMap")
      },
      {
        test: /\.json$/,
        loader: "json"
      },
    ]
  },

  postcss() {
    return [autoprefixer];
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),

    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ["app", "vendor"]
    }),

    new HtmlWebpackPlugin({
      template: "src/index.ejs",
      minify: {
        preserveLineBreaks: true,
        collapseWhitespace: true,
        removeComments: true,
        removeAttributeQuotes: true,
      }
    })
  ]
};
