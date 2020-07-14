module.exports = {
  entry : "./src/App/Index.js",
  output : {
    path : __dirname + "/src/Public",
    filename : "bundle.js"
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};