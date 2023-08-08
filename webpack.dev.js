const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { htmlPagesWithPlugin, htmlComponentsWithPlugin } = require('./webpack.pages');


const cssLoaderOptions = {
  esModule: true,
  modules: {
    mode: 'global',
    exportGlobals: true,
    namedExport: true,
    exportLocalsConvention: 'dashesOnly',
    exportOnlyLocals: false,
  },
};

const devServer = {
  static: {
    directory: path.resolve(__dirname, 'dist'),
  },
  port: 3000,
  // open: true,
  open: ['index.html'],
  compress: true,
  hot: true,
  client: {
    overlay: {
      errors: true,
      warnings: false,
      runtimeErrors: true,
    },
  },
};

module.exports = {
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: (data) => {
      const assetPath = path.dirname(data.filename).split('/').slice(1).join('/'); //folder path
      return `${assetPath}/[name].[contenthash][ext]`;
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.html', '.png', '.pdf', '.webp', '.svg', '.jpg'],
  },
  devServer,
  devtool: 'source-map',
  stats: {
    children: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
      scriptLoading: 'defer',
      minify: {
        collapseWhitespace: false,
        removeComments: false,
      }
    }),
    ...htmlPagesWithPlugin,
    ...htmlComponentsWithPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ['html-loader'],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: cssLoaderOptions,
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
};