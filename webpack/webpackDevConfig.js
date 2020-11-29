const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const basePath = path.resolve(__dirname, '..');

const baseConfig = {
  mode: 'development',
  module: {
    rules: [{
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }, {
      test: /\.(jpg|jpeg|png|gif|mp3)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name]-[hash:8].[ext]'
          }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        }
      ],
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
          }
        },
        'postcss-loader',
        'sass-loader'
      ],
    }, {
      test: /\.svg/,
      use: {
        loader: 'svg-url-loader',
        options: {
          limit: 1000
        }
      }
    }, {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      }]
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    modules: [
      path.join(basePath, 'node_modules'),
    ],
    alias: {
      'src': path.resolve(basePath, 'src/')
    }
  }
};

module.exports = [{
  ...baseConfig,
  name: 'client',
  target: 'web',
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(basePath, 'src/index.tsx'),
  ],
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: '/public',
  },
  plugins: [
    ...baseConfig.plugins,
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css',
    }),
  ],
}, {
  ...baseConfig,
  name: 'server',
  target: 'node',
  entry: [
    path.resolve(basePath, 'src/server/index-hot.js'),
  ],
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    publicPath: '/public',
    libraryTarget: 'commonjs2'
  },
}];