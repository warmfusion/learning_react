require('es6-promise').polyfill();

var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client');

var config = {
  entry: APP_DIR + '/component/Mosaic.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      },
      {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
      }

    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  }
};



module.exports = config;
