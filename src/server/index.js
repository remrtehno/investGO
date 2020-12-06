/**
 * Entry for prod server
 */

const fs = require('fs');
import express from 'express';
import path from 'path';

const cookieParser = require('cookie-parser');

const appDirectory = fs.realpathSync(process.cwd());
const statsFile = path.join(appDirectory, 'build', 'public', 'loadable-stats.json');

const envConfig = require('../../env');

import serverRenderer from './renderer.jsx';

// Express
const app = express();

const PORT = 4444;

if (envConfig.useCompression) {
    const compression = require('compression');
    app.use(compression());
}

// for temporary old landing
app.use('/public', express.static(path.resolve(process.cwd(), 'build/public')));

if (process.env.APP_ENV === 'stage') {
    app.use('/storybook', express.static(path.resolve(process.cwd(), 'build/storybook')));
}

app.use(cookieParser());

app.get('*', serverRenderer({ clientStats: statsFile, hot: false }));

app.listen(PORT, () => {
    console.log('Server running on http://localhost: ' + PORT);
});
