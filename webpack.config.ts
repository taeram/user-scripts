import webpack from "webpack";
import path from "path";
import fs from "fs";
import TerserPlugin from 'terser-webpack-plugin';

const config: webpack.Configuration = {
    entry: {
        "a_dark_room": './src/a_dark_room.user.ts',
        "environment_canada_reload_every_hour": './src/environment_canada_reload_every_hour.user.ts',
    },
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: /(\s@|UserScript==)/i,
                    },
                },
                extractComments: false,
            })
        ]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            }
        }]
    },
    output: {
        path: path.resolve(__dirname),
        filename: '[name].user.js',
    },
    resolve: {
        modules: [
            "node_modules",
            "src"
        ],
        extensions: [".ts", ".js"],
    },
    plugins: [],
    externals: {
        "jquery": "jQuery"
    }
};

export default config;
