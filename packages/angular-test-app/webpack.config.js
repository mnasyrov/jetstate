const path = require('path');
const {AngularCompilerPlugin} = require('@ngtools/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    devServer: {
        stats: {
            warningsFilter: /System.import/
        }
    },

    stats: {
        warningsFilter: /System.import/
    },

    module: {
        rules: [
            {
                test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                loader: '@ngtools/webpack',
                exclude: [/\.(spec|e2e)\.ts$/, /node_modules/]
            }
        ]
    },

    plugins: [
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: path.resolve('src/app/app.module#AppModule'),
            sourceMap: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve('src/index.html')
        })
    ]
};
