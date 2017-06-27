path    = require('path');
webpack = require('webpack');

module.exports = {
  cache: true,
  debug: true,
  output: {
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ]
};
