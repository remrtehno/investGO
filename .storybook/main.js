const [webpackConfig] = require('../webpack/webpackDevConfig');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/preset-typescript'],
  webpackFinal: async (config) => {
    return  {
        ...config,
        module: { ...config.module, rules: webpackConfig.module.rules },
        resolve: {
            ...config.resolve,
            modules: webpackConfig.resolve.modules,
            alias: webpackConfig.resolve.alias
        },
        plugins: [
            ...config.plugins,
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash].css',
              chunkFilename: '[name].[contenthash].css',
            }),
        ]
    };
  },
};
