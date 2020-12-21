const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const prodConfig = require("./webpack.pro");
const devConfig = require("./webpack.dev");

const commonConfig = {
  entry: './src/index.js',
  output: {
    filename: 'lionAxios.min.js', // 输出的文件名
    path: path.resolve(__dirname, 'dist'), // 输出的绝对路径
    library: 'lion', // 类库的命名空间
    globalObject: 'this', // 适配 Node.js
    libraryTarget: "umd", // umd 打包规范
    libraryExport: 'default'
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
};

module.exports = (env)=>{
  if(env && env.production){
    return merge(commonConfig,prodConfig);
  }else{
    return merge(commonConfig,devConfig);
  }
}