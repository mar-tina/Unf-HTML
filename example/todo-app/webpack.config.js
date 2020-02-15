const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html"
    }),
    new webpack.ProvidePlugin({
      TextDecoder: ["text-encoding", "TextDecoder"],
      TextEncoder: ["text-encoding", "TextEncoder"]
    })
  ],
  module: {
    rules: [{
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  "targets": {
                    "node": "10"
                  }
                }
              ],
              "@babel/preset-react"
            ],
            plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-async-to-generator"]
          }
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};