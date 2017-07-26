'use strict';

const path = require('path');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
  entry: './src/Binder',
  output: {
    path: __dirname + '/dist',
    filename: 'binder.js',
    libraryTarget: 'var',
    library: 'Binder'
  },
  watch: NODE_ENV == 'dev',
  devtool: NODE_ENV == 'dev'? 'inline-source-map' : 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        }
      }
    ]
  }
};

if(NODE_ENV == 'production'){
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin
  );
}
