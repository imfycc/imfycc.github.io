'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// https://github.com/kangax/html-minifier#options-quick-reference
const minifyHTML = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyJS: true
}

module.exports = {
  entry: './source-src/main.js',
  output: {
    filename: 'js/[name].[hash:6].js',
    publicPath: "./",
    path: path.resolve(__dirname, 'source'),
    clean: {
      keep: /^(?!source\/js|source\/style).*/, // 使用正则表达式来指定保留的内容，这里表示保留除了source/js和source/style目录及其内容之外的所有内容
      dry: false, // 设置为false，表示实际执行清理操作，若设置为true则只是模拟清理，查看会清理哪些内容而不真正执行
    }
  },

  module: {
    rules: [{
      test: /\.s?css$/,
      use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
      ]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      cache:false,
      minify: minifyHTML,
      template: './source-src/script.ejs',
      filename: '../layout/_partial/script.ejs'
     }),
    new HtmlWebpackPlugin({
      inject: false,
      cache:false,
      minify: minifyHTML,
      template: './source-src/css.ejs',
      filename: '../layout/_partial/css.ejs'
    })
  ]
};

