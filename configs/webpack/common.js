// shared config (dev and prod)

const { resolve } = require('path')
const webpack = require('webpack')
const { CheckerPlugin } = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// https://12factor.net/config
require('../env')

let ctx = resolve(__dirname, '../../src')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['node_modules', ctx]
  },
  context: ctx,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.tsx?$/,
        include: [/src/, /lib/],
        use: [
          {
            loader: 'tslint-loader',
            options: {
              cache: true
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } }
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false'
        ]
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html.ejs' }),
    new webpack.EnvironmentPlugin([
      'FIREBASE_API_KEY',
      'FIREBASE_PROJECT_ID',
      'FIREBASE_SENDER_ID'
    ])
  ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  performance: {
    hints: false
  }
}
