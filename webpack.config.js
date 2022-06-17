
// 引入自动生成 html 的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require("path")

// webpack.config.js
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: "development",
    entry: "./src/main.js", // 入口
    output: { 
        path: path.join(__dirname, "lib"), // 出口路径
        filename: "index.js" ,// 出口文件名
        // 删除上次的文件夹再打包
        clean:true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
          }),
          new VueLoaderPlugin()

    ],
    devServer:{
        // yarn serve 自动打开浏览器
        open:true,
        // 0-65535
        // post: 65535,
    },
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:["style-loader","css-loader"],
            },
            {
                test:/\.less$/i,
                use:["style-loader","css-loader","less-loader"]
            },
            {
                test:/\.(png|gif|jpeg)$/i,
                type:"asset",
                parser:{
                    dataUrlCondition:{
                        // 字节
                        maxSize:21*1024
                    }
                },
                generator: {
                    filename:'images/[hash:6][ext]'
                }
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)$/i,
                type:"asset/resource",
                generator:{
                    filename:'fonts/[hash:6][ext]'
                }
            },
            {
                test:/\.js$/i,
                use: ["babel-loader"]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
              }
        ]
        ,
        // plugins: [
        //     // 请确保引入这个插件！
        //     new VueLoaderPlugin()
        //   ]
    }
}