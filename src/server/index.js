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
app.use('/landing', express.static(path.resolve(process.cwd(), 'build/public/landing')));

if (process.env.APP_ENV === 'stage') {
    app.use('/storybook', express.static(path.resolve(process.cwd(), 'build/storybook')));
}

app.use(cookieParser());

app.get('/', async (req, res, next) => {
    const response = await fetch(`https://testing.investgo.ru/api/user`, {
        headers: {
            Cookie: req.headers.Cookie
        }
    })
      .then((res) => res.json());

    if (response.status === 'error') {
        res.sendFile(path.resolve(process.cwd(), 'build/public/landing/landing.html'));
        return;
    }

    next();
});

// app.get('/investor', async (req, res, next) => {
//   const response = await fetch(`https://testing.investgo.ru/api/user`, {
//     headers: {
//       Cookie: req.headers.Cookie
//     }
//   })
//     .then((res) => res.json());

//   if (response.status === 'error') {
//     res.sendFile(path.resolve(process.cwd(), 'build/public/landing/investor.html'));
//     return;
//   }

//   next();
// });

// app.get('/borrower', async (req, res, next) => {
//   const response = await fetch(`https://testing.investgo.ru/api/user`, {
//     headers: {
//       Cookie: req.headers.Cookie
//     }
//   })
//     .then((res) => res.json());

//   if (response.status === 'error') {
//     res.sendFile(path.resolve(process.cwd(), 'build/public/landing/borrower.html'));
//     return;
//   }

//   next();
// });

// app.get('/privacy', async (req, res, next) => {
//   const response = await fetch(`https://testing.investgo.ru/api/user`, {
//     headers: {
//       Cookie: req.headers.Cookie
//     }
//   })
//     .then((res) => res.json());

//   if (response.status === 'error') {
//     res.sendFile(path.resolve(process.cwd(), 'build/public/landing/privacy.html'));
//     return;
//   }

//   next();
// });

// app.get('/documents', async (req, res, next) => {
//   const response = await fetch(`https://testing.investgo.ru/api/user`, {
//     headers: {
//       Cookie: req.headers.Cookie
//     }
//   })
//     .then((res) => res.json());

//   if (response.status === 'error') {
//     res.sendFile(path.resolve(process.cwd(), 'build/public/landing/documents.html'));
//     return;
//   }

//   next();
// });

// app.get('/documents/disclosure', async (req, res, next) => {
//   const response = await fetch(`https://testing.investgo.ru/api/user`, {
//     headers: {
//       Cookie: req.headers.Cookie
//     }
//   })
//     .then((res) => res.json());

//   if (response.status === 'error') {
//     res.sendFile(path.resolve(process.cwd(), 'build/public/landing/documents.html'));
//     return;
//   }

//   next();
// });

app.get('*', serverRenderer({ clientStats: statsFile, hot: false }));

app.listen(PORT, () => {
    console.log('Server running on http://localhost: ' + PORT);
});
