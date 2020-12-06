/**
 * Starts local dev server with HMR
 */

const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const webpack = require('webpack');
const [clientConfig, serverConfig] = require('../webpack/webpackDevConfig');
const proxy = require('http-proxy-middleware');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

// const envConfig = require('../config/env');

// console.log('env config: ', envConfig);

const app = express();

const multiCompiler = webpack([clientConfig, serverConfig]);
const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client');
const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');

let isStarted = false;

app.use(express.static(path.resolve(process.cwd(), 'build')));

app.use(cookieParser());

// app.use(
//     envConfig.api.base,
//     proxy({
//       target: envConfig.api.proxy,
//       changeOrigin: true,
//       logLevel: 'debug',
//       cookieDomainRewrite: '',
//     })
// );

// note that we pass multiCompiler to webpackDevMiddleware
app.use(
  webpackDevMiddleware(multiCompiler, {
    publicPath: clientConfig.output.publicPath,
    writeToDisk: true,
  })
);
app.use(webpackHotMiddleware(clientCompiler, {
  path: '/__webpack_hmr'
}));
app.use(webpackHotServerMiddleware(multiCompiler, {
  serverRendererOptions: {outputPath: clientConfig.output.path},
  publicPath: clientConfig.output.publicPath,
}));

// Add multiCompiler done hook for nice console output
multiCompiler.hooks.done.tap('startSsr', () => {
  // prevent server to try to start again after hot reload
  if (!isStarted) {
    app.listen(1212, () => {
      console.log('Running on http://localhost:1212/');
    });
    isStarted = true;
  }
});
