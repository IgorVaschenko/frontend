let path = require('path')

const conf = {
    entry: './es6/scripts.js',
    output: {
        path: path.resolve(__dirname, './js'),
        filename: 'main.js',
        publicPath: 'js/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.m?jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            }
        ]
    }
}

module.exports = (env, options) => {
    conf.devtool = options.mode === "production" ?
        false :
        "cheap-module-eval-source-map"

    return conf
}