const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./example/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "example/index.html"
    }),
    new webpack.ProvidePlugin({
      TextDecoder: ["text-encoding", "TextDecoder"],
      TextEncoder: ["text-encoding", "TextEncoder"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};
