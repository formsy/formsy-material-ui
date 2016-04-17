'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormsyText = _react2.default.createClass({
  displayName: 'FormsyText',

  mixins: [_formsyReact2.default.Mixin],

  propTypes: {
    name: _react2.default.PropTypes.string.isRequired,
    value: _react2.default.PropTypes.any,
    onFocus: _react2.default.PropTypes.func,
    onBlur: _react2.default.PropTypes.func
  },

  handleChange: function handleChange(event) {
    if (this.getErrorMessage() != null) {
      this.setValue(event.currentTarget.value);
      if (this.props.onChange) this.props.onChange(event, event.currentTarget.value);
    } else {
      if (this.isValidValue(event.target.value)) {
        this.setValue(event.target.value);
        if (this.props.onChange) this.props.onChange(event, event.target.value);
      } else {
        this.setState({
          _value: event.currentTarget.value,
          _isPristine: false
        });
        if (this.props.onChange) this.props.onChange(event, event.currentTarget.value);
      }
    }
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleKeyDown: function handleKeyDown(event) {

    if ((0, _keycode2.default)(event) === 'enter') this.handleEnterKeyDown(event);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },

  handleEnterKeyDown: function handleEnterKeyDown(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onEnterKeyDown) this.props.onEnterKeyDown(event, event.currentTarget.value);
  },

  _setMuiComponentAndMaybeFocus: _utils._setMuiComponentAndMaybeFocus,

  render: function render() {

    delete this.props.defaultValue;

    return _react2.default.createElement(_TextField2.default, _extends({}, this.props, {
      ref: this._setMuiComponentAndMaybeFocus,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onFocus: this.props.onFocus,
      onKeyDown: this.handleKeyDown,
      errorText: this.getErrorMessage(),
      value: this.getValue() || this.props.value || ''
    }));
  }
});

exports.default = FormsyText;