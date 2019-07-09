const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'server/public');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: './src',
  output: {
    path: publicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: srcPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: publicPath,
    historyApiFallback: true,
    watchContentBase: true,
    watchOptions: {
      ignored: [/node_modules/, /server/]
    },
    stats: 'minimal',
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost/c319_DIYblogging_tracker/server/public'
      }
    }
  }
};
