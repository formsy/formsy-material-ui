var webpack = require('webpack')

module.exports = function (config) {
  if (process.env.TRAVIS) {
    config.set({
      browsers: [ 'PhantomJS' ],
      frameworks: [ 'phantomjs-shim', 'mocha', 'chai', 'sinon' ],
      singleRun: true
    })
  } else {
    config.set({
      browsers: [ 'Chrome' ],
      frameworks: [ 'mocha', 'chai', 'sinon' ]
    })
  }

  config.set({
    basePath: '',
    reporters: [ 'mocha' ],
    mochaReporter: { output: 'autowatch' },
    files: [ 'test/index.js' ],
    preprocessors: {
      './src/*': [ 'webpack', 'sourcemap' ],
      './test/*': [ 'webpack', 'sourcemap' ]
    },
    webpackMiddleware: { noInfo: true },
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        root: '.',
        extensions: [ '', '.js', '.jsx' ],
        alias: { 'sinon': 'sinon/pkg/sinon' }
      },
      externals: {
        'jsdom': 'window',
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window'
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            include: [ /src/, /test/ ],
            exclude: /node_modules/,
            loader: 'babel-loader'
          }, {
            test: /\.json$/,
            loader: 'json-loader'
          }
        ],
        noParse: [ /node_modules\/sinon\// ]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('test')
        })
      ]
    }
  })
}
