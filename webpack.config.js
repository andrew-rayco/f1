const path = require('path')

module.exports = {
  entry: [path.resolve(__dirname + '/client/index.js')],
  output: {
    path: path.join(__dirname + '/public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.join(__dirname, 'node_modules')]
  },
  devtool: 'source-map'
}
