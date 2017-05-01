const path = require('path');
const webpack = require('webpack');

const plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js'
  }),
];

// Configure Production / Development differences

// Slow but project is small
let devtool = 'source-map';
if (process.env.NODE_ENV === 'production') {
  // All Production config
  devtool = false;
  plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
        },
        sourceMap: false,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
  );
} else {
  // Development
  const ProgressBarPlugin = require('progress-bar-webpack-plugin');
  plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      new ProgressBarPlugin()
  );
}

module.exports = {
  devtool,
  plugins,
  entry: {
    error: path.join(__dirname, 'static', 'js', 'error.js'),
    home: path.join(__dirname, 'static', 'js', 'home.js'),
    shared: path.join(__dirname, 'static', 'js', 'shared.js'),
    splash: path.join(__dirname, 'static', 'js', 'splash.js'),
    schedule: path.join(__dirname, 'static', 'js', 'schedule.js'),
    vendor: ['vue', 'vue-resource'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: "[file].map",
    publicPath: '/',
  },
  resolve: {
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: ['style-loader', 'css-loader', {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          }
        }]
      },
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            sourceMap: true,
          },
        }],
      },
    ],
  },
};