/* eslint-disable */
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8'),
);


class FilterPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.afterEmit.tap(
      'FilterPlugin',
      (compilation) => {
        compilation.warnings = (compilation.warnings).filter(
          warning => !this.options.filter.test(warning.message)
        );
      }
    );
  }
}

module.exports = withCss(withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables,
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];

      config.plugins.push(
        new FilterPlugin(
          { filter: /chunk styles \[mini-css-extract-plugin]\nConflicting order between:/ }
        )
      )

      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }

    config.resolve.alias.components = path.resolve('components');
    config.resolve.alias.globals = path.resolve('global');
    config.resolve.alias.lib = path.resolve('lib');
    config.resolve.alias.modules = path.resolve('modules');

    return config;
  },
  env: {
    API_URL: process.env.API_URL,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
}));
