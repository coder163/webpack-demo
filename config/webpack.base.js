const path = require('path');
var glob = require('glob');

//分离CSS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function configEntry(globPath) {
    let entries = {}
    glob.sync(globPath).forEach(function (entry) {
        basename = path.basename(entry, path.extname(entry));
        //动态拼装一个JSON对象
        entries[basename] = entry;

    });
    console.log("-------------------------开始拼装entry--------------------")
    console.log(entries);

    return entries;
}


module.exports = {
    //开发环境、生产环境production
    mode: "development", //
    devtool: 'inline-source-map',
/*    devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "./build"),
        hot: true,
        quiet: true,
        proxy: {
            '/api/index': {
                target: 'http://localhost:80/index.php',
                secure: false
            }
        }
    }, */
	devServer: {
        port: 3000,
        contentBase: path.join(__dirname, "./build"),
        hot: true,
        quiet: true,
        inline: true,
        stats: {
            colors: true
        },

        overlay: true,
        progress: true,

        proxy: {
            '/api': {
                target: 'http://192.168.1.103:8080',
                // target:'http://localhost:8080',
                pathRewrite: {
                    '^/api': '/api'
                },
                changeOrigin: true
            }
        }
    },
    entry: configEntry('./src/pages/*/*.js'),
    output: {
        //出口文件的文件名
        filename: 'scirpts/[name][hash:8].js',
        //出口文件所在的路径
        path: path.resolve(__dirname, '../build')
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/(node_modules)/'
        },

            {
                test: /\.html$/,
                use: [{
                    loader: 'underscore-template-loader'
                }]
            }, {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {}
                },
                    'css-loader',
                    'postcss-loader',
                    "less-loader"
                ]
            }, {
                test: /\.(png|jpg|gif|jpeg|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        name: "[name].[hash:5].[ext]",
                        limit: 1024, // size <= 1kib
                        outputPath: "imgs/",
                        publicPath: '/imgs'
                    }
                }]
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "file-loader"
            }


        ]
    }


};