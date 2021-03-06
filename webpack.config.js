const path = require('path');
const webpack = require('webpack');

const env = process.env.NODE_ENV;
const isDevelopment = env === 'development';

const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  entry: {
    app: ['./public/index.html', './src/main.js'],
  },
  resolve: {
    mainFields: ['module', 'main', 'browser'],
  },
  devtool: isDevelopment ? 'inline-source-map' : 'source-map',
  devServer: {
    contentBase: './public',
    // host: process.env.WEBPACK_DEV_HOST,
    host: 'localhost',
    // port: process.env.WEBPACK_DEV_PORT
    port: 8086
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.html/,
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]',
        },
      },
    ],
  },
  externals: {
    'leaflet': 'L',
    'jQuery': '$',
    moment: 'moment',
    accounting: 'accounting',
    axios: 'axios',
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new Visualizer({ filename: './statistics.html' })
  ],
  mode: env,
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
          priority: 5,
        },
        layerboard: {
          test: /layerboard/,
          chunks: 'initial',
          name: 'layerboard',
          priority: 10,
        },
      },
    },
  },
};
