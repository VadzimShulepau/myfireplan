import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import TerserWebpackPlugin from "terser-webpack-plugin";
import { htmlPagesWithPlugin, htmlComponentsWithPlugin } from './webpack.pages.js';
import url from 'url';
const __filename = url.fileURLToPath(import.meta.url); //path to js file
const __dirname = path.dirname(__filename); // pth to js folder


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

const optimize = () => {
  return {
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
    ],
  };
};

export default {
  mode: 'production',
  entry: {
    main: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
  },
  output: {
    filename: '[name].[contenthash].js',
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
  devtool: false,
  stats: {
    children: true,
  },
  optimization: optimize(),
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
      scriptLoading: 'defer',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
    ...htmlPagesWithPlugin,
    ...htmlComponentsWithPlugin,
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: {
                removeComments: true,
                collapseWhitespace: true,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: cssLoaderOptions,
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif|webp)$/i,
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          },
        ],
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