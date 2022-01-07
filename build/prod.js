const { merge } = require('webpack-merge');
const webpack = require('webpack');
const base = require('./base');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const config = merge(base, {
    mode: 'production',
    entry: {
        vendor: 'react',
        app: './main'
    },
    performance: {
        hints: false,
    },
    optimization: {
        usedExports: true,
        runtimeChunk: {
            name: 'manifest'
        },
        emitOnErrors: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    mangle: false,
                    keep_classnames: false,
                    keep_fnames: false,
                    module: false,
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    }
                }
            }),
            new CssMinimizerPlugin({
                parallel: 4
            })
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 6,
            maxInitialRequests: 4,
            automaticNameDelimiter: '~',
            cacheGroups: {
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial'
                }
            }
        }
    },
    plugins: [
        // new BundleAnalyzerPlugin()
        new ProgressBarPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
});

config.plugins = config.plugins.filter((item) => !(item instanceof MiniCssExtractPlugin));
const configWithTimeMeasures = smp.wrap(config);
configWithTimeMeasures.plugins.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[name].[contenthash].css'
}));

module.exports = configWithTimeMeasures;
// module.exports = smp.wrap(config);
