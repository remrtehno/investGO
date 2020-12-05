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
