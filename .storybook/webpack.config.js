const path = require('path');
const lessToJS = require('less-vars-to-js')
const fs = require('fs')

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, '../assets/antd-custom.less'), 'utf8')
)

module.exports = ({ config, mode }) => {
  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
      }
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../') 
    },
    {
      test: /\.less$/,
      use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader', options: {
              modifyVars: themeVariables,
              javascriptEnabled: true
            }
          },
      ],
      include: /node_modules/,
    },
  );

  config.resolve.alias.components = path.resolve(__dirname, '../components')
  config.resolve.alias.globals = path.resolve(__dirname, '../global')
  config.resolve.alias.lib = path.resolve(__dirname, '../lib')

  return config;
};