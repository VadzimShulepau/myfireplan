const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const htmlPagesDirectory = path.resolve(__dirname, 'src', 'pages');
const htmlPages = [];
fs.readdirSync(htmlPagesDirectory, { withFileTypes: true }).map((file) => file.isFile() && htmlPages.push(file.name));
// console.log(htmlPages)
const htmlPagesWithPlugin = htmlPages.map((page) => {
  return new HtmlWebpackPlugin({
    inject: 'body',
    filename: page,
    template: path.resolve(htmlPagesDirectory, page),
    favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
    minify: {
      collapseWhitespace: true,
      removeComments: true,
    },
  })
})
// console.log(htmlPages)
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
  // {
  //   from: path.resolve(__dirname, './src/assets/img/dominos.png'),
  //   to: path.resolve(__dirname, './dist/assets/img/dominos.png'),
  // },
  // {
  //   from: path.resolve(__dirname, './src/assets/img/sosedi.png'),
  //   to: path.resolve(__dirname, './dist/assets/img/sosedi.png'),
  // },
  // {
  //   from: path.resolve(__dirname, './src/assets/adjustment'),
  //   to: path.resolve(__dirname, './dist/assets/adjustment'),
  // },
  // {
  //   from: path.resolve(__dirname, './src/assets/img/maket'),
  //   to: path.resolve(__dirname, './dist/assets/img/maket'),
  // },
  // {
  //   from: path.resolve(__dirname, './src/assets/files'),
  //   to: path.resolve(__dirname, './dist/assets/files'),
  // },
  // {
  //   from: path.resolve(__dirname, './src/assets/certificates'),
  //   to: path.resolve(__dirname, './dist/assets/certificates'),
  // },
  // {
  //   from: path.resolve(__dirname, './src/assets/img/category_sprite.webp'),
  //   to: path.resolve(__dirname, './dist/assets/img/category_sprite.webp'),
  // },
  // {
  //   from: path.resolve(__dirname, './src/assets/img/class_z.webp'),
  //   to: path.resolve(__dirname, './dist/assets/img/class_z.webp'),
  // },
  // {
  //   from: path.resolve(__dirname, './src/assets/img/form_img.jpg'),
  //   to: path.resolve(__dirname, './dist/assets/img/form_img.jpg'),
  // },
  // {
  //   from: path.resolve(__dirname, './src/assets/img/form_img3.jpg'),
  //   to: path.resolve(__dirname, './dist/assets/img/form_img3.jpg'),
  // },
  {
    from: path.resolve(__dirname, './src/assets'),
    to: path.resolve(__dirname, './dist/assets'),
  },
];

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
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: copyPluginPatterns,
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
            options: cssLoaderOptions,
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/i,
        type: 'asset/resource',
        // generator: {
        //   filename: './assets/fonts/[name][ext]',
        // },
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
              // optipng.enabled: false will disable optipng
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
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
        type: 'asset/resource',
        // generator: {
        //   filename: './assets/img/[name][ext]',
        // },
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