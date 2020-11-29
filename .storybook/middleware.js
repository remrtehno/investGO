const express = require('express');
const path = require('path');

module.exports = function (app) {
    app.use('/images', express.static(path.resolve(__dirname, '../assets/image')));
    app.use('/manifest', express.static(path.resolve(__dirname, '../assets/manifest')));
    app.use('/intl', express.static(path.resolve(__dirname, '../assets/intl')));
    app.use('/manifest.json', express.static(path.resolve(__dirname, '../assets/manifest/manifest.json')));
};
