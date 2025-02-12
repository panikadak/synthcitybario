const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'main.[contenthash].js',
      publicPath: isProduction ? '/synthcitybario/' : '/',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [
            /node_modules/
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        three: path.resolve('./node_modules/three')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: true
      }),
      new CopyWebpackPlugin({
        patterns: [
          { 
            from: 'css',
            to: 'css'
          },
          {
            from: 'js',
            to: 'js'
          },
          { 
            from: 'img',
            to: 'img'
          },
          {
            from: 'assets',
            to: 'assets'
          }
        ]
      })
    ],
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'docs'),
        },
        {
          directory: path.join(__dirname, 'js'),
          publicPath: '/js'
        }
      ],
      compress: true,
      port: 3000,
      hot: true
    }
  };
};