const webpackConfig = require("./webpack.test");
const helpers = require("./helpers");

module.exports = function karmaConf(config) {
  process.env.NODE_ENV = "testing";

  const _config = {
    basePath: helpers.root(),

    frameworks: ["mocha", "chai"],

    files: [
      { pattern: "./config/karma-test-files.js", watched: false }
    ],

    preprocessors: {
      "./config/karma-test-files.js": ["webpack", "sourcemap"]
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: "errors-only"
    },

    customLaunchers: {
      ChromeSmall: {
        base: "Chrome",
        flags: ["--window-size=300,230"]
      }
    },

    reporters: ["mocha"],

    mochaReporter: {
      output: "autowatch"
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,

    browsers: [
      "ChromeSmall"
    ],

    singleRun: false
  };

  config.set(_config);
};
