const path = require('path');
var glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清理我们的输出目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
//webpack内置热更新
const webpack = require('webpack');
//分离CSS
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//主要用于压缩、去重
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const merge = require('webpack-merge');
var FriendlyErrorsWebpackPlugin = require('@nuxtjs/friendly-errors-webpack-plugin');

var baseWebpackConfig = require('./config/webpack.base');


//合并配置文件
module.exports = merge(baseWebpackConfig, {
    //配置别名，不需要在引用的时候使用../../的方式引入文件
    resolve: {
        alias: {
            'common': path.resolve(__dirname, './src/common/'),
            'components': path.resolve(__dirname, './src/components/')
        }

    },
    //插件列表
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin({
            clearConsole: true,
            compilationSuccessInfo: {
                messages: ['编译成功！访问地址 http://localhost:3000/index/index.html'],
                //logLevel: 'INFO'//INFO WARNING  ERROR SILENT
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        //分离CSS
        new MiniCssExtractPlugin({
            filename: "styles/[name][hash:8].css",
            chunkFilename: "[id].css"
        })/*,
        new OptimizeCssAssetsWebpackPlugin({
            //引入cssnano配置压缩选项
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {
                discardComments: {

                    removeAll: true

                }
            },
            //是否将插件信息打印到控制台
            canPrint: true
        })*/

    ]
});



//动态创建HTML模板
function configHtmlWebpackPlugin(globPath) {
    console.log("---------------开始拼装HTML模板---------------------------")
    glob.sync(globPath).forEach(function (entry) {

        basename = path.basename(entry, path.extname(entry));

        tmp = entry.split('/').splice(2);

        var conf = {
            // 模板路径
            template: entry,
            filename: basename + '/' + basename + ".html",
            // js插入位置
            inject: 'body',
            // 每个html引用的js模块，也可以在这里加上vendor等公用模块
            chunks: [basename]
        };

        console.log(conf);

        // 正确输出js和html的路径
        // pathname = str.substring(0, str.length - 1);
        module.exports.plugins.push(new HtmlWebpackPlugin(conf));
    });
}




configHtmlWebpackPlugin('./src/pages/*/*.html');