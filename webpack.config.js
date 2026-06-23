const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const paginas = ['index', 'nosotros', 'servicios', 'contacto'];

module.exports = {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/main.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'css/estilos.css' }),
    new CopyPlugin({ patterns: [{ from: 'images.png', to: 'images.png' }] }),
    ...paginas.map((p) =>
      new HtmlWebpackPlugin({
        template: `./${p}.html`,
        filename: `${p}.html`,
        inject: false,
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeEmptyAttributes: true,
          useShortDoctype: true,
          minifyCSS: true,
          minifyJS: true,
        },
      })
    ),
  ],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
};
