const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../js/main.js'),
    output:
        {
            hashFunction: 'xxhash64',
            filename: 'bundle.[contenthash].js',
            path: path.resolve(__dirname, '../dist')
        },
    devtool: 'source-map',
    plugins:
        [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../index.html'),
                minify: true
            }),
            new MiniCSSExtractPlugin()
        ],
    module:
        {
            rules:
                [
                    // HTML
                    {
                        test: /\.(html)$/,
                        use: ['html-loader']
                    },

                    // JS
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: ['babel-loader']
                    },

                    // CSS
                    {
                        test: /\.css$/,
                        use: [
                            'style-loader',
                            "css-loader"
                        ],
                    },

                    // Images
                    {
                        test: /\.(png|jpe?g|gif|svg)$/i,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: '[name].[ext]',
                                    esModule:false,
                                    publicPath: 'images'
                                }
                            },
                        ],

                    },

                    // Fonts
                    {
                        test: /\.(ttf|eot|woff|woff2|otf)$/,
                        use: ['file-loader']
                    }
                ]
        }
};
