const fs = require('fs');
const path = require('path');
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

module.exports = {
  htmlPagesWithPlugin,
  htmlComponentsWithPlugin,
}