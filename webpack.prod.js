const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


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
    // assetModuleFilename: './assets/[name].[hash][ext]',
    // publicPath: 'dist',
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
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
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true }
            },
          ],
        },
      }),
      new TerserWebpackPlugin({
        terserOptions: {
          compress: true,
        }
      }),
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets', 'adjustment'),
          to: path.resolve(__dirname, 'dist', 'assets', 'adjustment'),
        },
        {
          from: path.resolve(__dirname, 'src', 'assets', 'img'),
          to: path.resolve(__dirname, 'dist', 'assets', 'img'),
        },
      ]
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.html$/i,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       esModule: true,
      //     },
      //   },
      // },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
        ],
      },
      // {
      //   test: /\.(woff|woff2|eot|ttf)$/i,
      //   type: 'asset/resource',
      //   // generator: {
      //   //   filename: './assets/fonts/[name][ext]',
      //   // }
      // },
      // {
      //   test: /\.(png|jpg|jpeg|svg|gif)$/i,
      //   type: 'asset/resource',
      //   // generator: {
      //   //   filename: './assets/img/[name][ext]',
      //   // }
      // },
    ],
  },
};