const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devServer = (isDev) =>
    !isDev
        ? {}
        : {
              devServer: {
                  open: true,
                  hot: true,
                  port: 8080,
                  compress: true,
                  headers: {
                      'Access-Control-Allow-Origin': '*',
                  },
              },
          };

module.exports = ({ develop }) => ({
    entry: {
        app: './src/index',
    },
    mode: develop ? 'development' : 'production',
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash].[ext]',
    },
    module: {
        rules: [
            {
                test: /\.(?:ico|gif|png|jpg|svg|jpeg|mp3|wav|ogg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.ts'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ],
    ...devServer(develop),
});
