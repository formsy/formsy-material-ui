'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormsyRadio = _react2.default.createClass({
  displayName: 'FormsyRadio',

  mixins: [_formsyReact2.default.Mixin],

  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render: function render() {}
});

module.exports = FormsyRadio;