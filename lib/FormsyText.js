'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var TextField = require('material-ui/lib/text-field');

var FormsyText = React.createClass({
  displayName: 'FormsyText',

  mixins: [Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string
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
    return React.createElement(TextField, _extends({}, this.props, {
      defaultValue: this.props.value,
      onChange: this.handleChange,
      onBlur: this.handleBlur,
      onEnterKeyDown: this.handleEnterKeyDown,
      errorText: this.getErrorMessage(),
      value: this.getValue() }));
  }
});

module.exports = FormsyText;