const path = require('path')
// eslint-disable-next-line import/no-unresolved
const slsw = require('serverless-webpack')

module.exports = {
  entry: slsw.lib.entries,
  target: 'async-node',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }]
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  }
}
