'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _materialUiLibTextField = require('material-ui/lib/text-field');

var _materialUiLibTextField2 = _interopRequireDefault(_materialUiLibTextField);

var FormsyText = _react2['default'].createClass({
  displayName: 'FormsyText',

  mixins: [_formsyReact2['default'].Mixin],

  propTypes: {
    name: _react2['default'].PropTypes.string.isRequired,
    value: _react2['default'].PropTypes.string
  },

  handleChange: function handleChange(event) {
    if (this.getErrorMessage() != null) {
      this.setValue(event.currentTarget.value);
    } else {
      if (this.isValidValue(event.target.value)) {
        this.setValue(event.target.value);
      } else {
        this.setState({
          _value: event.currentTarget.value,
          _isPristine: false
        });
      }
    }
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
  },

  handleEnterKeyDown: function handleEnterKeyDown(event) {
    this.setValue(event.currentTarget.value);
  },

  render: function render() {
    return _react2['default'].createElement(_materialUiLibTextField2['default'], _extends({}, this.props, {
      defaultValue: this.props.value,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onEnterKeyDown: this.handleEnterKeyDown,
      errorText: this.getErrorMessage(),
      value: this.getValue()
    }));
  }
});

module.exports = FormsyText;