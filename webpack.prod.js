const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
  mode: 'production',
  // watch: true,
  entry: {
    main: path.resolve(__dirname, 'src', 'index.js'),
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: './assets/[name].[hash][ext]',
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    hot: true,
    compress: true,
    open: true,
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: {
          loader: 'html-loader',
          options: {
            minimize: {
              removeComments: true,
              collapseWhitespace: true,
            },
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/fonts/[name][ext]',
        }
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/img/[name][ext]',
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src', 'css'),
    //       to: path.resolve(__dirname, 'dist', 'css'),
    //     },
    //     {
    //       from: path.resolve(__dirname, 'src', 'assets'),
    //       to: path.resolve(__dirname, 'dist', 'assets'),
    //     },
    //   ]
    // }),
  ],
};