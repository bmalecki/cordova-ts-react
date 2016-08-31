module.exports = {
  devtool: "inline-source-map",

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", "jsx"],
    alias: {
      sinon: "sinon/pkg/sinon"
    }
  },

  externals: {
    "react/addons": true,
    "react/lib/ExecutionEnvironment": true,
    "react/lib/ReactContext": true,
    cheerio: "window"
  },

  module: {
    noParse: [
      /node_modules\/sinon\//,
    ],

    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: "source-map"
      }
    ],

    loaders: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader!ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: "html"

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: "null"
      },
      {
        test: /\.s?css$/,
        loader: "null"
      },
      {
        test: /\.json$/,
        loader: "json"
      },

    ]

  }
};

