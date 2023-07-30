const path = require('path');
const HTMLWebpackPlugin =require('html-webpack-plugin');


const mode = process.argv.at(3) || 'development';
const isDevMode = mode === 'development';

module.exports = {
  mode,
  devtool: isDevMode && 'source-map',
  // context: path.resolve(__dirname, 'src'),
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  entry: {
    index: ['@babel/polyfill' ,path.resolve(__dirname, 'src', 'index.js')], // [name].js, babel polyfill for async functions
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: !isDevMode,
          },
        }],
      },
      {
        test: /\.[c|sc|sa]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'], //for read classes
          },
        },
      },
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      // template: './index.html', // with use context
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: 'index.html',
      favicon: './src/favicon.ico',
      scriptLoading: 'defer',
      minify: !isDevMode,
    }),
  ]
};