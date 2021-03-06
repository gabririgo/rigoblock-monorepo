const path = require('path')
const AbiExtractPlugin = require('./abiExtractPlugin')
const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: path.join(__dirname, '/fetchContracts.js'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'index'
  },
  target: 'node',
  resolve: {
    extensions: ['.js']
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: require.resolve('babel-loader'),
        options: {
          compact: true
        }
      }
    ]
  },
  plugins: [
    new AbiExtractPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 2, // Must be greater than or equal to one
      minChunkSize: 1000
    })
  ]
}
