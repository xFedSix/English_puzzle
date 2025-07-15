const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

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
                test: /\.css$/i,
                use: [develop ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.json', '.ts', '.jpg', '.jpeg', '.png', '.gif', '.svg'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new CopyPlugin({
            patterns: [{ from: 'src/worldCollectionData/files', to: 'files' }],
        }),
    ],
    ...devServer(develop),
});
