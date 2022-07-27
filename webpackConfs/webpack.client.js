const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugins = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BUILD_TYPE = process.env.BUILD_TYPE;
const IS_DEV = BUILD_TYPE === "dev";
const config = require('./webpack.common').createConfig();
const { resolve } = require('path');



module.exports = {
   ...config,
   devtool: IS_DEV ? 'source-map' : false,
   module: {
      ...config.module,

      rules: [
         ...config.module.rules,
         /* {
            test: /\.(scss|css)$/i,
            use: [
               MiniCssExtractPlugin.loader,
               {
                  loader: 'css-loader',
                  options: {
                     modules: {
                        mode: 'local',
                        localIdentName: '[name]__[local]__[hash:base64:5]',
                        auto: /\.module\.\w+$/i,
                     },
                  },
               },
               'sass-loader'
            ],
         },
         {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.pdf$/],
            use: [
               {
                  loader: 'file-loader',
                  options: {
                     name: '[name].[ext]',
                     outputPath: 'assets/',
                  },
               }
            ],
         }, */
      ],
   },

   plugins: [
      ...config.plugins,
      /* new MiniCssExtractPlugin({
         filename: 'build/styles.css'
      }), */
      new HTMLWebpackPlugins({
         publicPath: "/client/",
         template: resolve(__dirname, "../", 'public/index.html'),
         minify: {
            removeComments: false
         }
      }),
      new CopyWebpackPlugin({
         patterns: [
            {
               from: resolve(__dirname, "../", 'public/favicon.ico'),
               to: resolve(__dirname, "../", 'dist/client/favicon.ico'),
            }
         ]
      }),
   ],
   optimization: {
      splitChunks: {
         cacheGroups: {
            default: false,
            vendors: false,

            vendor: {
               chunks: 'all', // both : consider sync + async chunks for evaluation
               name: 'vendor', // имя чанк-файла
               test: /node_modules/, // test regular expression
            }
         }
      }
   },
};