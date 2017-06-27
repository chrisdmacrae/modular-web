path    = require('path');
webpack = require('webpack');

module.exports = {
  cache: true,
  debug: true,
  module: {
    loaders: [{
      loader: 'babel-loader',
      test: /\.(js|jsx|es6)$/,
      exclude: /(node_modules|bower_components)/,
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react'],
      }
    }, , {
      test: /\.json?$/,
      loader: 'json-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  output: {
    filename: '[name].min.js'
  }
};
