const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')// 引入node内置模块path
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const Dotenv = require('dotenv-webpack');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');       // webpack4以后 改为此插件 css样式分离
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); 

module.exports ={
  mode: process.env.NODE_ENV === 'prod' ? "production" : "development",                     // 开发模式
  entry:'./src/main.js',                   // 入口文件，把src下的main.js编译到出口文件
  output:{                                 // 出口文件
    path:path.resolve(__dirname,'dist'),   // 出口路径和目录
    filename: "[name].js",
    clean: true// 编译后的名称
    },
    plugins:[
        new HtmlWebpackPlugin({                // 自动插入到dist目录中
          title: 'webpack搭建vue项目',
          template:'./index.html',
        }),
      new VueLoaderPlugin(),
      new Dotenv({
        path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`)
      }),
      new ProgressBarWebpackPlugin({
        complete: "█",
        clear: true
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {           // 成功的时候输出
          messages: [
            'You can now view project-vue in the browser.'
          ],
        },
        clearConsole: true,                  // 是否每次都清空控制台
      }),
      new MiniCssExtractPlugin({
        filename: process.env.NODE_ENV === 'prod' ? 'css/[name].[contenthash].css' : 'css/[name].css',
        chunkFilename: process.env.NODE_ENV === 'prod' ? 'css/[name].[contenthash].css' : 'css/[name].css',
      }),
      new CssMinimizerPlugin(),
    ],
    resolve:{  // 此配置用在引用文件时
        extensions: ['.js', '.vue', '.json'],  // 引入路径是不用写对应的后缀名
        alias:{
          'vue$':'vue/dist/vue.esm.js',        // 正在使用的是vue的运行时版本，而此版本中的编译器是不可用的，我们需要把它切换成运行时 + 编译的版本
          '@': path.resolve(__dirname,'../src'), // 用@直接指引到src目录下
        }
  },
  devServer: {
    open: true,                            // 自动打开浏览器
    hot: true,                             // 热更新
    port: '8888'                           // 指定端口8888
  },
  optimization: {
    nodeEnv: false
  },
    module: {
        rules: [
          { 
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.css$/,
            use: [
              process.env.NODE_ENV === 'prod' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
              'css-loader',
            ],
          },
          {
            test: /.less$/,
            use: [
              process.env.NODE_ENV === 'prod' ? MiniCssExtractPlugin.loader : 'vue-style-loader',
              'css-loader',
              'postcss-loader',
              'less-loader'
            ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024,
            },
          },
          generator: {
            filename: 'images/[base]',
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          type: 'asset',
          generator: {
            filename: 'files/[base]',
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: 'asset',
          generator: {
            filename: 'media/[base]',
          },
        },
        {
          test: /\.(ts|js)x?$/,
          use: [
            'babel-loader',
          ],
          exclude: /node_modules/,
        },
        ]
      }
  
}
