'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _materialUiLibTimePickerTimePicker = require('material-ui/lib/time-picker/time-picker');

var _materialUiLibTimePickerTimePicker2 = _interopRequireDefault(_materialUiLibTimePickerTimePicker);

var _utils = require('./utils');

var FormsyTime = _react2['default'].createClass({
  displayName: 'FormsyTime',

  mixins: [_formsyReact2['default'].Mixin],

  propTypes: {
    name: _react2['default'].PropTypes.string.isRequired
  },

  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
  },

  _setMuiComponentAndMaybeFocus: _utils._setMuiComponentAndMaybeFocus,

  render: function render() {
    return _react2['default'].createElement(_materialUiLibTimePickerTimePicker2['default'], _extends({}, this.props, {
      ref: this._setMuiComponentAndMaybeFocus,
      onChange: this.handleValueChange
    }));
  }
});

module.exports = FormsyTime;