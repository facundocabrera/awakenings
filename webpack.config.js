const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const publicPath = path.join(__dirname, "public");

console.log(publicPath);

module.exports = {
  // https://webpack.js.org/migrate/5/#make-sure-to-use-mode
  mode: "development",
  entry: {
    p5: "./node_modules/p5/lib/p5.min.js",
    // ver que onda con core-js/stable porque "@babel/polyfill" esta deprecated
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
    }),
    new webpack.ProvidePlugin({
      p5: "p5",
      "p5.sound": "p5/lib/addons/sound",
    }),
  ],
  output: {
    filename: "[name].bundle.js",
    path: publicPath,
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
};
