const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');

  module.exports = {
    mode: 'development',
    entry: {
      // the app starts here! 
      app: './src/awakenings.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
    },
    plugins: [
      // Tell CleanWebpackPlugin that we don't want to remove the index.html file after 
      // the incremental build triggered by watch.
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Hot 🔥❤️',
        // Use my custom template instead
        template: './src/index.html'
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
      ]
    }
  };