const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
// const webpack = require('webpack');


module.exports = {
  entry: [
    './src/js/index.js',
    './src/scss/index.scss'
  ],
  output: {
    filename: './bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, 'src/js'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'] 
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg|woff|html)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: 'img/[name].[ext]'}  
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: 'img/css-bg/[name].[ext]'}  
          }
        ]
      },
      {
        test: /\.(woff)$/,
        use: [
          {
            loader: 'file-loader',
            options: {name: 'fonts/[name].[ext]'}  
          }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, 'src/scss'),
        use: ExtractTextPlugin.extract({
          use: [{
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                  plugins: [
                      autoprefixer({
                          browsers:['last 4 version']
                      })
                  ],
                  sourceMap: true
              }
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },
    ]
  },
  
  plugins: [
    new ExtractTextPlugin({
      filename: './style.bundle.css',
      allChunks: true,
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    port: 3000,
    host: '192.168.0.100',
    watchContentBase: true,
    // hot: true,
  }
};