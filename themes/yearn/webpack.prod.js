const { merge } = require("webpack-merge");
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

console.log(merge);

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].[hash:6].css'
    }),
  ]
});
