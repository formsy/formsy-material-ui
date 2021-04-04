
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./formsy-material-ui.cjs.production.min.js')
} else {
  module.exports = require('./formsy-material-ui.cjs.development.js')
}
