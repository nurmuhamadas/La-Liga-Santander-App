const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        main: './src/index.js',
        sw: "./src/sw.js"
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]_bundle.js'
    },
    module: {
        rules: [{
                test: /\.css/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: "[name].[hash:12].[ext]",
                        outputPath: 'src/img/'
                    }
                }],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'La Liga Santander',
            template: "./src/index.html",
            chunks: ["main"]
        }),
        new FaviconsWebpackPlugin({
            logo: './src/assets/logo/LaLiga_Santander.svg',
            mode: 'webapp',
            devMode: 'webapp',
            favicons: {
                appName: 'La Liga Santander',
                appShortName: 'La Liga',
                appDescription: 'Aplikasi yang menyediakan informasi seputar liga spanyol',
                background: '#fff',
                theme_color: '#fff',
                start_url: '../index.html',
                display: 'standalone',
                orientation: 'portrait',
                gcm_sender_id: 1081167280359
            }
        }),
    ]
}