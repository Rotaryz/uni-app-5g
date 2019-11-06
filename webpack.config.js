module.exports = {
  plugins: [
    //  设置环境变量信息
    new webpack.DefinePlugin({
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1'
    })
  ]
}
