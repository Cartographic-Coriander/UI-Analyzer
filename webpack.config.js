var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './client/public/components/index.jsx'
  ],
  output: {/*find the 'start' specified at entry and write the new bundle.js file to the directory below*/
    path: __dirname + '/client/public',
    publicPath: 'client/public',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/public',
    hot: true
  },
  module: { /*the below means that webpack will find jsx and js files and process both through babel*/
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
