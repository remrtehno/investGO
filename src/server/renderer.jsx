/**
 * Server renderer
 * used in both dev and prod builds
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';

// Store
import { ChunkExtractor } from '@loadable/server';

// Components
import { App } from 'src/components/common/App/App';

// Set fetch for use inside saga
global.fetch = require('node-fetch');

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

    promise = Promise.resolve(null);

    const chunkExtractor = new ChunkExtractor(extractorOptions);

    promise.then(data => {
        // console.log('-========== Data loaded: ', data);

        const component = ReactDOMServer.renderToString(chunkExtractor.collectChunks(
          <App url={req.url} />
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
                <html lang="ru">
                    <head>
                        ${helmet.title.toString()}
                        ${helmet.meta.toString()}
                        ${helmet.link.toString()}
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <link rel="preconnect" href="https://fonts.gstatic.com">
                        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;700;800&family=Open+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet">
                        ${styleTag}
                    </head>
                    <body>
                        <section class="hero is-fullheight" id="app">${component}</section>
                        ${scriptTags}
                    </body>
                </html>`;

            res.send(html);
        });
    });
};
