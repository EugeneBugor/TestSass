const webpack = require('webpack');

const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
});
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    entry: isProduction ? ["./src/stylesheets/main.scss"] : [
        'webpack-hot-middleware/client',
        "./src/stylesheets/main.scss"
    ],
    output: {
        path: "/",
        filename: "bundle.js"
    },
    plugins: isProduction ?
        [
            new webpack.NoErrorsPlugin(),
            definePlugin,
            new webpack.optimize.UglifyJsPlugin({
                compress: {warnings: false},
                output: {comments: false}
            })
        ] : [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.s(c|a)ss$/,
                loader: 'style!css!resolve-url!sass'
            }
        ]
    }
};