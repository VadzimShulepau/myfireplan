import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { htmlPagesWithPlugin, htmlComponentsWithPlugin } from './webpack.pages.js';
import url from 'url';
import 'dotenv/config';

const __filename = url.fileURLToPath(import.meta.url); //path to js file
const __dirname = path.dirname(__filename); // pth to js folder
// import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const { SERVER_PORT, EMAIL, EMAIL_HOST, EMAIL_PORT, EMAIL_PASSWORD } = process.env;

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
  port: SERVER_PORT,
  // open: true,
  open: ['index.html'],
  compress: true,
  hot: true,
  // historyApiFallback: true,
};

export default {
  mode: 'development',
  watch: true,
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
    extensions: ['.js', '.css'],
  },
  devServer,
  devtool: 'source-map',
  stats: {
    children: true,
  },
  plugins: [
    // new NodePolyfillPlugin(),
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
        include: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env'],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
};
