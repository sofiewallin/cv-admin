const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: '[name].bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        watchFiles: ['./src/**/*.html']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/favicon.ico',
            filename: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    'style-loader', // Creates `style` nodes from JS strings
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader' // Compiles Sass to CSS
                ]
            }
        ]
    }
});