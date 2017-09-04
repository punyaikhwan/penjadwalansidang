var path = require('path');
var webpack = require('webpack');

module.exports = [
    {
        devServer: {
            inline: true,
            contentBase: './html',
            port: 3000,
            historyApiFallback: true
        },
        devtool: 'cheap-module-eval-source-map',
        entry: './dev/js/index.js',
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ['babel-loader'],
                    exclude: /node_modules/
                },
                {
                    test: /\.scss/,
                    loader: 'style-loader!css-loader!sass-loader'
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                      'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                      'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
                    ]
                },
                { 
                    test: /\.css$/, 
                    loader: 'style-loader!css-loader'
                },
                { 
                    test: /\.less$/, 
                    loader: 'style-loader!css-loader!less-loader'
                }
            ],
        },
        output: {
            path: '/var/www/html',
            filename: 'js/bundle.min.js'
        },
        plugins: [
            new webpack.optimize.OccurrenceOrderPlugin()
        ],
    }
]
