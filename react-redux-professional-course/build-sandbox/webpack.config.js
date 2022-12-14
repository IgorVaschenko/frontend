const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')



module.exports = (env = {}) => {

    const { mode = 'development' } = env

    const isProd = mode === 'production'
    const isDev = mode === 'development'

    const getStyleLoaders = () => {

        return [isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader']
    }
    const getPlugins = () => {
        const plugins = [
            new HtmlWebpackPlugin({
                title: 'Title from config',
                buildTime: new Date().toISOString(),
                template: 'public/index.html',
            }),
        ]
        isProd && plugins.push(
            new MiniCssExtractPlugin({
                filename: 'main-[hash:8].css'
            })
        )
        return plugins
    }


    return {
        mode: isProd ? "development" : isDev ? 'development' : false,

        output: {
            filename: isProd ? 'main-[hash:8].js' : undefined
        },

        module: {
            rules: [
                //babel-loader
                {
                    test: /\.js$/,
                    exclude: /node-modules/,
                    loader: 'babel-loader',
                },
                // Loading images
                {
                    test: /\.(png|jpe?g|gif|ico)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name]-[sha1:hash:7].[ext]'
                        }
                    }]
                },
                // Loading fonts
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }]
                },
                // Loading CSS
                {
                    test: /\.(css)$/,
                    use: getStyleLoaders(),
                    // use: [MiniCssExtractPlugin.loader, 'css-loader']
                    // use: ['style-loader', 'css-loader']
                },
                // Loading SASS/SCSS
                {
                    test: /\.(s[ca]ss|)$/,
                    use: [...getStyleLoaders(),
                    // use: [MiniCssExtractPlugin.loader, 'css-loader',
                    // use: ['style-loader', 'css-loader',
                    { loader: 'sass-loader', options: {} },
                    ]
                },
            ]
        },

        plugins: getPlugins(),
        // plugins:  [
        // new HtmlWebpackPlugin({
        //     title: 'Title from config',
        //     buildTime: new Date().toISOString(),
        //     template: 'public/index.html',
        // }),
        // new MiniCssExtractPlugin({
        //     filename: 'main-[hash:8].css'
        // })
        // ],

        devServer: {
            open: true,
        }
    }
}