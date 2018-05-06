const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    './resources/styles/app.scss'
  ],
  output: {
    filename: 'public/app.js'
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'public/app.css'
    })
  ]
}
