# webpack-demo
a simple webpack demo
适合webpack初学者的demo（webpack版本4+）  

【安装nodejs】    

webpack依赖nodejs环境   

https://nodejs.org/en/下载nodejs后安装

下载后node_modules文件夹下自带了npm模块


新建文件夹

安装完成后打开安装路径下的文件夹，创建node_global和node_cache文件夹，分别用于存放全局安装的模块和缓存文件


cmd运行

npm config set prefix "node_global文件夹路径"

npm config set cache "node_cache文件夹路径"


设置环境变量


在【系统变量】下新建【NODE_PATH】，输入"node_global文件夹路径下的node_modules 文件夹"，将【用户变量】下的【Path】修改为"node_globa文件夹路径"


【配置npm镜像】

npm config set registry https://registry.npm.taobao.org

【使用npm安装模块】

npm install 模块名      安装在运行命令的当前路径下的node_modules文件夹下

npm install 模块名 -g    安装在全局文件夹下

【初始化】

npm init

一直yes

npm init -y


【npm安装参数 使用说明】

生产环境npm install --save

开发环境 npm install --save-dev

--save  写入到 dependencies 对象

--save-dev  写入到 devDependencies 对象

-S就是--save的简写

-D就是--save-dev的简写


npm i仅仅是npm install的简写。实际使用的区别点主要如下(windows下)： 
1. 用npm i安装的模块无法用npm uninstall删除，用npm uninstall i才卸载掉 
2. npm i会帮助检测与当前node版本最匹配的npm包版本号，并匹配出来相互依赖的npm包应该提升的版本号 
3. 部分npm包在当前node版本下无法使用，必须使用建议版本 
4. 安装报错时intall肯定会出现npm-debug.log 文件，npm i不一定

【安装webpack 4+版本】

npm install --save-dev webpack

安装指定版本

npm install --save-dev webpack@version
	
（一般为了避免版本冲突，不使用全局安装，将weback安装在当前项目路径下）


npm install --save-dev webpack-cli

（4+需要安装webpack-cli）

【安装webpack-dev-server】

npm install webpack-dev-server --save-dev

【安装css-loader style-loader】

npm install --save-dev  css-loader style-loader

css-loader将css代码编译，style-loader插入到网页里面去

【package.json】

			
    "scripts": {
    	"watch": "webpack --watch",
    	"start": "webpack-dev-server --open",
    	"build": "webpack"
    }
            

【webpack.config.js】

【单入口】

（loader的加载顺序是从右往左。css的编译顺序是先用css-loader将css代码编译，再交给style-loader插入到网页里面去。）

	
    const path = require('path');
    const config = {
    	mode: 'development',
   	entry: './src/index.js',
    	output: {
        	path: path.resolve(__dirname, 'dist'),
        	filename: 'bundle.js'
    	},
    	module: {
        	rules: [
		{
		    test: /\.css$/, 
                    use: ['style-loader','css-loader']             
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

    	]
    };
    module.exports = config;
            



【多入口】

	entry: {
        	app: './src/js/app.js',
        	search: './src/js/search.js'
    	},
    	output: {
        	filename: '[name].js',
        	path: __dirname + '/dist'
    	}
	
	



【图片打包】

【css文件使用图片】file-loader、url-loader

区别：url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL（将图片转为base64字符串，能更快的加载图片）。一旦图片过大，就需要使用file-loader的加载本地图片，故url-loader可以设置图片超过多少字节时，使用file-loader加载图片。若配置了limit，然后移除file-loader，则打包出错。

1KB(kilobyte)=1000byte,    1KiB(kibibyte)=1024byte


安装npm install --save-dev url-loader file-loader

	{
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        name: "images/[name].[ext]",
                        limit: 8192
                    }
                  }
                ]
            }


【html中使用图片】

通过js文件给html的<img>标签的src属性赋值

require导入

	var img=require('../images/5.jpg')

	document.getElementsByTagName('img')[0].src=img;


【插件】

【html-webpack-plugin】

通过模板自动生成页面

安装npm install --save-dev html-webpack-plugin

	const HtmlWebpackPlugin = require('html-webpack-plugin');

	plugins: [
        	new HtmlWebpackPlugin({ // 打包输出HTML
           	title: 'Hello World app',
            	filename: 'index.html',//生成html文件的文件名
            	template: './src/template.html',//模板路径
            	chunks: ['app']//添加的js
           })
    	]


模板文件，例：

	<!DOCTYPE html>
	<html lang="en">
	<head>
    	    <meta charset="UTF-8">
    	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    	    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    	    <title><%= htmlWebpackPlugin.options.title %></title>
	</head>
	<body>
    	    <a href="/app.html">app</a>
    	    <a href="/search.html">search</a>
	</body>
	</html>


【mini-css-extract-plugin】

安装npm install --save-dev mini-css-extract-plugin


mini-css-extract-plugin：把 js 中 import 导入的样式文件代码，打包成一个实际的 css 文件，结合 html-webpack-plugin，在 dist/index.html 中以 link 插入 css 文件；默认将 js 中 import 的多个 css 文件，打包时合成一个


	new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        })


	{ 
                test: /\.css$/, 
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]             
        }


通过模板生成的文件会自动link相应的css（js文件里面的css全部合并成一个css）

如果不是通过模板生成的html页面，可以通过手动添加link的方式添加css文件。


【监听 编译】

npm run watch（修改文件自动编译）


【运行】

npm start（会自动打开浏览器）


【单入口 文件结构】

	|- package.json
	|- webpack.config.js
	|- /dist
  	    |- bundle.js
  	    |- index.html
	|- /src
  	    |- index.js
  	    |- style.css
	|- /node_modules


【多入口 文件结构】

	|- package.json
	|- webpack.config.js
	|- /dist
  	    |- app.js
  	    |- search.js
  	    |- index.html
  	    |- search.html
	|- /src
  	    |-js
	    	|- app.js
	    	|- search.js
	    	|- 1.js
  	    |- css
	    	|- style.css
  	    |- images
	    	|- 2.gif
	    |- /node_modules



【文件引入】

在html里面引入bundle.js


在index.js里面引入css

	import './css/style.css';

在index.js里面引入其他js

	var obj=require("./1.js")

在1.js里面导出obj对象

	module.exports=obj;

【自定义loader】

读取txt中的字符串，先逆序再将首字母大写

reverse-loader.js

	module.exports=function(src){
  	  if(src){
  	      console.log('--- reverse-loader input:', src)
  	      src=src.split('').reverse().join('');
  	      console.log('--- reverse-loader output:', src)
	    }
 	   return src;
	}


initialUpperCase-loder.js

	module.exports=function(src){
	    if(src){
  	      console.log('--- initialUpperCase-loder input:', src);
 	       src=src.charAt(0).toUpperCase()+src.slice(1);
 	       console.log('--- initialUpperCase-loder output:', src);
 	       return `module.exports = '${src}'`;
 	   }
	}


webpack.config.js

	resolveLoader:{
	        //去哪些目录下寻找loader，有先后顺序
 	       modules:['node_modules','./myloaders/']
 	   }


	{ 
                test: /\.txt$/, 
                use: [
                    "initialUpperCase-loder",
                    "reverse-loader"
                ]                      
        } 


【自定义plugin】

testPlugin.js

	class testPlugin{
   		 constructor(options){
  	      console.log('MyPlugin constructor:', options);
  	  }
  	  apply(compiler){
   	     compiler.plugin('compilation',function(compilation){
  	          console.log('——————————compilation——————————');
    	    })
    	    compiler.plugin('emit',function(compilation,callback){
    	        console.log('——————————emit——————————');
     	       callback();
     	   })
    	}
	}
	module.exports=testPlugin;

webpack.config.js

	const testPlugin = require('./myPlugins/testPlugin');

	new testPlugin({
            option1:'option1',
            option2:'option2'
    })



【其他辅助功能】

【删除node_modules文件夹】

安装删除工具

	npm install rimraf -g

	rimraf node_modules



