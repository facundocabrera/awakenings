const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const publicPath = path.join(__dirname, "public");

module.exports = {
  // https://webpack.js.org/migrate/5/#make-sure-to-use-mode
  mode: "development",
  entry: {
    // load
    p5: "./node_modules/p5/lib/p5.min.js",
    "p5.sound": {
      dependOn: "p5",
      import: "./node_modules/p5/lib/addons/p5.sound.min.js",
    },
    app: "./src/main.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: publicPath,
    hot: true,
    client: {
      progress: true,
    },
    port: 9000,
  },
  experiments: {
    asyncWebAssembly: true,
    // WebAssembly as async module (Proposal)
    syncWebAssembly: true,
    // WebAssembly as sync module (deprecated)
    outputModule: false,
    // Allow to output ESM - no funciona con p5, tira error import.meta
    topLevelAwait: true,
    // Allow to use await on module evaluation (Proposal)
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // https://www.npmjs.com/package/clean-webpack-plugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Awakening",
      // Use my custom template instead
      template: "./src/index.html",
      // do not defer js
      scriptLoading: "blocking",
    }),
    new webpack.ProvidePlugin({
      p5: "p5", // expose p5 as a global variable to allow plugins to be loaded correctly
    }),
  ],
  output: {
    filename: "[name].js",
    path: publicPath,
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
};
