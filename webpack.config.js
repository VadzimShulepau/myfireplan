const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
// const  NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");

const htmlPagesDirectory = path.resolve(__dirname, 'src', 'pages');
const htmlComponentsDirectory = path.resolve(__dirname, 'src', 'pages', 'components');
const htmlPages = [];
const htmlComponents = [];

fs.readdirSync(htmlPagesDirectory, { withFileTypes: true }).map((file) => file.isFile() && htmlPages.push(file.name));
fs.readdirSync(htmlComponentsDirectory, { withFileTypes: true }).map((file) => file.isFile() && htmlComponents.push(file.name));

const htmlPagesWithPlugin = htmlPages.map((page) => {
  return new HtmlWebpackPlugin({
    inject: 'body',
    filename: page,
    template: path.resolve(htmlPagesDirectory, page),
    favicon: path.resolve(__dirname, 'src', 'favicon.ico'),
    scriptLoading: 'defer',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
    },
  });
});

const htmlComponentsWithPlugin = htmlComponents.map((component) => {
  return new HtmlWebpackPartialsPlugin({
    path: path.resolve(__dirname, 'src', 'pages', 'components', component),
    location: component.split('.')[0].trim(),
    template_filename: ['index.html', ...htmlPages],
  });
});

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
  // {
  //   from: path.resolve(__dirname, './src/assets'),
  //   to: path.resolve(__dirname, './dist/assets'),
  // },
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
    // publicPath: './',
    assetModuleFilename: (data) => {
      // return './assets/' + data.filename.split('/').slice(1).join('/');
      const assetPath = path.dirname(data.filename).split('/').slice(1).join('/'); //folder path
      return `${assetPath}/[name].[contenthash][ext]`;
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.html', '.png', '.pdf', '.webp', '.svg', '.jpg'],
    // alias: {
    //   '@images': path.resolve(__dirname, 'src', 'assets', 'img'),
    //   '@fonts': path.resolve(__dirname, 'src', 'assets', 'fonts'),
    //   '@files': path.resolve(__dirname, 'src', 'assets', 'files'),
    //   '@adjustment': path.resolve(__dirname, 'src', 'assets', 'adjustment'),
    //   '@certificates': path.resolve(__dirname, 'src', 'assets', 'certificates'),
    // },
        // fallback: {
    //   crypto: require('crypto-browserify'),
    //   os: require('os-browserify/browser'),
    //   stream: require('stream-browserify'),
    //   fs: false,
    //   net: false,
    //   tls: false,
    // },
    // modules: [path.resolve(__dirname), 'node_modules'],
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
    // new CopyPlugin({
    //   patterns: copyPluginPatterns,
    // }),
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
              ['@babel/preset-env', { targets: 'defaults' }],
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
};