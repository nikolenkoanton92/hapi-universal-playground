var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, 'public', 'index.js'),
  output: {
    path: __dirname + '/build',
    filename: 'index.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'developmenet')
    })]
};
