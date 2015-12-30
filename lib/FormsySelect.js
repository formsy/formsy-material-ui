'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _materialUiLibSelectField = require('material-ui/lib/select-field');

var _materialUiLibSelectField2 = _interopRequireDefault(_materialUiLibSelectField);

var _FormComponentMixin = require('./FormComponentMixin');

var _FormComponentMixin2 = _interopRequireDefault(_FormComponentMixin);

exports['default'] = _react2['default'].createClass({
  displayName: 'FormsySelect',

  mixins: [_formsyReact2['default'].Mixin],

  propTypes: {
    name: _react2['default'].PropTypes.string.isRequired
  },

  handleChange: function handleChange(event) {
    this.setValue(event.target.value);
  },

  render: function render() {
    return _react2['default'].createElement(_materialUiLibSelectField2['default'], _extends({}, this.props, {
      onChange: this.handleChange,
      errorText: this.getErrorMessage(),
      value: this.getValue() }));
  }
});
module.exports = exports['default'];