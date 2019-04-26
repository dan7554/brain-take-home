const path = require('path')
const webpack = require('webpack')
const ConfigWebpackPlugin = require('config-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const publicPath = '/dist/build/'

module.exports = env => {
  console.log('Environment: ', env.NODE_ENV)
  process.env.NODE_ENV = env.NODE_ENV

  return {
    entry: './src/index.js',
    output: {
      path: path.join(__dirname, publicPath),
      filename: '[name].bundle.js',
      publicPath: publicPath,
      sourceMapFilename: '[name].map'
    },
    devServer: {
      port: 3001,
      disableHostCheck: true,
      host: '0.0.0.0',
      //Be possible go back pressing the "back" button at chrome
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal',
      publicPath: publicPath,
      contentBase: path.join(__dirname, publicPath)
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      }),
      new ConfigWebpackPlugin('Config'),
      new CopyWebpackPlugin([
        { from: 'src/assets/images/', to: 'assets/images' }
      ])
    ],
    resolve: {
      alias: {
        '@ducks': path.join(__dirname, 'src/redux/ducks'),
        '@assets': path.join(__dirname, 'src/assets'),
        '@pages': path.join(__dirname, 'src/pages'),
        '@components': path.join(__dirname, 'src/components'),
        '@utility': path.join(__dirname, 'src/utility'),
        '@src': path.join(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.(s*)css$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.js|.jsx?$/,
          exclude: /(node_modules)/,
          loaders: ["babel-loader"]
        }]
    }
  }
}