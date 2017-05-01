var webpack = require('webpack');
var path = require('path');
var libraryName = 'relevant';
var outputFile = libraryName + '.js';

var config = {
  entry: __dirname + '/src/relevant.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }

      },
      
    ]
  },
  // resolve: {
  //   root: [
  //     path.resolve('./src')
  //   ],
  //   extensions: ['', '.js']
  // }
};

module.exports = config;