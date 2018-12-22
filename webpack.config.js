const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties',
                            ['@babel/plugin-transform-runtime', {
                                regenerator: true,
                            }],
                        ],
                    },
                }],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                            publicPath: '/',
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[name]_[local]_[hash:base64]',
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv({
                                    features: {
                                        'nesting-rules': true,
                                        'custom-media-queries': true,
                                    },
                                    stage: 2,
                                }),
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        htmlPlugin,
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'styles.css',
        }),
    ],
};
