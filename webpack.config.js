const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const testPlugin = require('./myPlugins/testPlugin');

const config = {
    mode: 'development',
    // entry: './src/app.js',
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: 'app.js'
    // },
    entry: {
        app: './src/js/app.js',
        search: './src/js/search.js',
        index: './src/js/index.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    resolveLoader:{
        //去哪些目录下寻找loader，有先后顺序
        modules:['node_modules','./myloaders/']
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]                      
            },         
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        name: "images/[name].[ext]",
                        limit: 71680
                    }
                  }
                ]
            },
            { 
                test: /\.txt$/, 
                use: [
                    "initialUpperCase-loder",
                    "reverse-loader"
                ]                      
            }            
        ]
    },
    devServer: {
        contentBase: './dist',
        host:'localhost', 
        port:8080,  
        open:true  //自动打开页面
    },
    plugins: [
        new HtmlWebpackPlugin({ // 打包输出HTML
            title: 'Hello World app',
            filename: 'index.html',//生成html文件的文件名
            template: './src/template.html',//模板路径
            chunks: ['index']//添加的js
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
        new testPlugin({
            option1:'option1',
            option2:'option2'
        })
    ]
};

module.exports = config;