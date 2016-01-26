module.exports = {
  entry: [
    './client/public/components/index.js'
  ],
  output: {
    path: __dirname + '/client/public',
    publicPath: './client/public',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/public'
  }
};
