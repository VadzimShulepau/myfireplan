const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');

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
      collapseWhitespace: false,
      removeComments: false,
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

const devServer = {
  static: {
    directory: path.resolve(__dirname, 'dist'),
  },
  port: 3000,
  open: true,
  liveReload: true,
  compress: true,
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
  devServer,
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
  devtool: 'source-map',
  stats: {
    children: true,
  },
  optimization: {},
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