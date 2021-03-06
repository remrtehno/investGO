/**
 * Starts local dev server with HMR
 */
const [compileEjs] = require("./ejs-build");

const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');
const webpack = require('webpack');
const [clientConfig, serverConfig] = require('../webpack/webpackDevConfig');
const { createProxyMiddleware } = require('http-proxy-middleware');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const fs = require('fs');

// const envConfig = require('../config/env');

// console.log('env config: ', envConfig);

const app = express();

const multiCompiler = webpack([clientConfig, serverConfig]);
const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client');
const serverCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'server');

let isStarted = false;

app.use(express.static(path.resolve(process.cwd(), 'build')));

app.use(cookieParser());

app.use('/api', createProxyMiddleware({
  target: 'https://testing.investgo.ru',
  changeOrigin: true,
  logLevel: 'debug',
  cookieDomainRewrite: '',
}));

app.get('/', async (req, res, next) => {
  const response = await fetch(`https://testing.investgo.ru/api/user`, {
    headers: {
      cookie: req.headers.cookie
    }
  })
    .then((res) => res.json());

  if (response.status === 'error') {
    res.sendFile(path.resolve(process.cwd(), 'build/landing/landing.html'));
    return;
  }

  next();
});


app.get('/investor', async (req, res, next) => {
  const response = await fetch(`https://testing.investgo.ru/api/user`, {
    headers: {
      Cookie: req.headers.Cookie
    }
  })
    .then((res) => res.json());

  if (response.status === 'error') {
    res.sendFile(path.resolve(process.cwd(), 'build/landing/investor.html'));
    return;
  }

  next();
});

app.get('/borrower', async (req, res, next) => {
  const response = await fetch(`https://testing.investgo.ru/api/user`, {
    headers: {
      Cookie: req.headers.Cookie
    }
  })
    .then((res) => res.json());

  if (response.status === 'error') {
    res.sendFile(path.resolve(process.cwd(), 'build/landing/borrower.html'));
    return;
  }

  next();
});

app.get('/privacy', async (req, res, next) => {
  const response = await fetch(`https://testing.investgo.ru/api/user`, {
    headers: {
      Cookie: req.headers.Cookie
    }
  })
    .then((res) => res.json());

  if (response.status === 'error') {
    res.sendFile(path.resolve(process.cwd(), 'build/landing/privacy.html'));
    return;
  }

  next();
});

app.get('/documents', async (req, res, next) => {
  const response = await fetch(`https://testing.investgo.ru/api/user`, {
    headers: {
      Cookie: req.headers.Cookie
    }
  })
    .then((res) => res.json());

  if (response.status === 'error') {
    res.sendFile(path.resolve(process.cwd(), 'build/landing/documents.html'));
    return;
  }

  next();
});

app.get('/documents/disclosure', async (req, res, next) => {
  const response = await fetch(`https://testing.investgo.ru/api/user`, {
    headers: {
      Cookie: req.headers.Cookie
    }
  })
    .then((res) => res.json());

  if (response.status === 'error') {
    res.sendFile(path.resolve(process.cwd(), 'build/landing/documents.html'));
    return;
  }

  next();
});

app.get('/tariffs', async (req, res, next) => {
  const response = await fetch(`https://testing.investgo.ru/api/user`, {
    headers: {
      Cookie: req.headers.Cookie
    }
  })
    .then((res) => res.json());

  if (response.status === 'error') {
    res.sendFile(path.resolve(process.cwd(), 'build/landing/tariffs.html'));
    return;
  }

  next();
});

app.get('/robots.txt', async (req, res, next) => {
  res.type('text/plain')
  res.send("User-agent: *\nDisallow: /");
});


app.get('/404', async (req, res, next) => {
  res.status(404);
  res.sendFile(path.resolve(process.cwd(), 'build/landing/404.html'));
  return;
});

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
  serverRendererOptions: { outputPath: clientConfig.output.path },
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
  compileEjs(path.resolve(process.cwd(), 'build/landing/'));
});

