'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _materialUiLibDatePickerDatePicker = require('material-ui/lib/date-picker/date-picker');

var _materialUiLibDatePickerDatePicker2 = _interopRequireDefault(_materialUiLibDatePickerDatePicker);

var _utils = require('./utils');

var FormsyDate = _react2['default'].createClass({
  displayName: 'FormsyDate',

  mixins: [_formsyReact2['default'].Mixin],

  propTypes: {
    name: _react2['default'].PropTypes.string.isRequired
  },

  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
  },

  _setMuiComponentAndMaybeFocus: _utils._setMuiComponentAndMaybeFocus,

  render: function render() {
    return _react2['default'].createElement(_materialUiLibDatePickerDatePicker2['default'],
    // Sets the default date format to be ISO8601 (YYYY-MM-DD), accounting for current timezone
    _extends({ formatDate: function (date) {
        return new Date(date.toDateString() + " 12:00:00 +0000").toISOString().substring(0, 10);
      }
    }, this.props, {
      ref: this._setMuiComponentAndMaybeFocus,
      defaultValue: this.props.value,
      onChange: this.handleValueChange,
      errorText: this.getErrorMessage(),
      value: this.getValue()
    }));
  }
});

module.exports = FormsyDate;