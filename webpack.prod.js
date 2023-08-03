const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");


const cssLoaderOptions = () => {
  return {
    esModule: true,
    modules: {
      mode: "global",
      exportGlobals: true,
      namedExport: true,
      exportLocalsConvention: 'dashesOnly',
      exportOnlyLocals: false,
    },
  };
};

const copyPluginPatterns = () => {
  return [
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
  ];
};

module.exports = {
  mode: 'production',
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
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
      chunkFilename: '[id].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: copyPluginPatterns(),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: cssLoaderOptions(),
          },
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
        test: /\.(png|jpg|jpeg|svg|gif|pdf)$/i,
        type: 'asset/resource',
        generator: {
          filename: './assets/img/[name][ext]',
        }
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