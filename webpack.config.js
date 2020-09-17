const path = require('path');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: "development",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 1234
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({template: './index.html'})
    ],
};
