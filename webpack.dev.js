const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const cssLoaderOptions = {
  esModule: true,
  modules: {
    mode: "global",
    exportGlobals: true,
    namedExport: true,
    exportLocalsConvention: 'dashesOnly',
    exportOnlyLocals: false,
  },
};

const copyPluginPatterns = [
  {
    from: path.resolve(__dirname, './src/assets/img/dominos.png'),
    to: path.resolve(__dirname, './dist/assets/img/dominos.png'),
  },
  {
    from: path.resolve(__dirname, './src/assets/img/sosedi.png'),
    to: path.resolve(__dirname, './dist/assets/img/sosedi.png'),
  },
  {
    from: path.resolve(__dirname, './src/assets/adjustment/'),
    to: path.resolve(__dirname, './dist/assets/adjustment/'),
  },
  {
    from: path.resolve(__dirname, './src/assets/img/maket'),
    to: path.resolve(__dirname, './dist/assets/img/maket'),
  },
];

const devServer = {
  static: {
    directory: path.resolve(__dirname, 'dist'),
  },
  port: 3000,
  hot: true,
  compress: true,
  open: true,
};

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.css'],
  },
  devServer,
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
      minify: {
        collapseWhitespace: false,
        removeComments: false,
      }
    }),
    new CopyPlugin({
      patterns: copyPluginPatterns,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: cssLoaderOptions,
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/fonts/[name][ext]',
        },
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|pdf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/img/[name][ext]',
        },
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          },
        },
      },
    ],
  },
};