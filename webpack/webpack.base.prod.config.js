const path = require('path');

module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [
            path.join(__dirname, '../node_modules'),
        ],
        alias: {
            'src': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name]-[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        limit: 1000
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                }]
            },
        ]
    },

    plugins: [

    ],
};
