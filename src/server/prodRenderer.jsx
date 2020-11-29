/**
 * Server renderer
 * used in both dev and prod builds
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';

// Routes
import { matchRoutes } from 'react-router-config';
import { StaticRouter as Router, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import Routes from '#/Routes';

// Store
import { ChunkExtractor } from '@loadable/server';

// Components
import {App} from 'src/components/common/App';

// Set fetch for use inside saga
global.fetch = require('node-fetch');

// intl
import { DEFAULT_LOCALE, LOCALE_TO_LANG } from '#/containers/ConnectedIntlProvider/constants';
import * as path from 'path';
import { glob } from 'glob';
import { statSync } from 'fs';

const intlSizeSum = glob.sync('../assets/intl/*.json')
  .map(filename => {
    return [
      path.basename(filename, '.json'),
      statSync(filename)
    ];
  })
  .reduce((sum, [locale, stat]) => {
    sum = sum + stat.size;
    return sum;
  }, 0);

const apiConfig = {
  base: process.env.API_BASE ? process.env.API_BASE + '/api' : '/api',
  serverBase: process.env.SERVER_API_BASE ? process.env.SERVER_API_BASE + '/api' : 'https://testing.icoqa.com' + '/api',
  intlSizeSum,
};

/**
 * Rendeder function wrapper
 * @param  {Object} clientStats    Client stats. Comes in differrent formats depending on build type
 * @param  {Boolean} hot           See if it's run by hot server middlewares (i.e. Dev mode)
 * @return {Function}              Rendeder function
 */
export default ({ clientStats, hot }) => (req, res, next) => {
  let promise;
  let stylePromise;

  const extractorOptions = hot
    ? { stats: clientStats }
    : { statsFile: clientStats };

  const locale = req.query.locale || req.cookies.locale || DEFAULT_LOCALE;
  const lang = LOCALE_TO_LANG[locale] || 'en';
  // console.log('currentRoute: ', currentRoute, dataLoaders);


  // if there is any async data loaders passed we have to wait for them to finish first
  promise = Promise.resolve(null);

  const chunkExtractor = new ChunkExtractor(extractorOptions);

  promise.then(data => {
    const context = { data };

    // console.log('-========== Data loaded: ', data);

    const hasPreloadedData = false;

    const component = hasPreloadedData ?
      ReactDOMServer.renderToString(chunkExtractor.collectChunks(
        <App />
      )) : ReactDOMServer.renderToString(chunkExtractor.collectChunks(
        <App />
      ));

    // Disable css embedding for Dev server
    if (hot) {
      stylePromise = Promise.resolve(null);
    } else {
      stylePromise = chunkExtractor.getCssString();
    }

    const scriptTags = chunkExtractor.getScriptTags();

    stylePromise.then((cssString) => {
      const styleTag = hot
        ? chunkExtractor.getStyleTags()
        : ReactDOMServer.renderToString(
          <style dangerouslySetInnerHTML={{
            __html: cssString
          }}/>
        );

      const helmet = Helmet.renderStatic();

      let html = `
                <!doctype html>
                <html lang="${lang}">
                    <head>
                        ${helmet.title.toString()}
                        ${helmet.meta.toString()}
                        ${helmet.link.toString()}

                        ${styleTag}
                    </head>
                    <body>
                        <section class="hero is-fullheight" id="app">${component}</section>
                        <div id="modal-root"></div>

                        <script>window.__INITIAL__DATA__ = ${JSON.stringify(initialState)}</script>
                        ${scriptTags}
                    </body>
                </html>`;

      if (context.url) {
        res.writeHead(301, {Location: context.url});
        res.end();
      } else {
        res.send(html);
      }
    });
  });
};
