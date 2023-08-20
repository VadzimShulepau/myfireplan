import fs from'fs';
import path from'path';
import HtmlWebpackPlugin from'html-webpack-plugin';
import HtmlWebpackPartialsPlugin from'html-webpack-partials-plugin';
import url from 'url';
const __filename = url.fileURLToPath(import.meta.url); //path to js file
const __dirname = path.dirname(__filename); // pth to js folder

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
  });
});

const htmlComponentsWithPlugin = htmlComponents.map((component) => {
  return new HtmlWebpackPartialsPlugin({
    path: path.resolve(__dirname, 'src', 'pages', 'components', component),
    location: component.split('.')[0].trim(),
    template_filename: ['index.html', ...htmlPages],
  });
});

export {
  htmlPagesWithPlugin,
  htmlComponentsWithPlugin,
};