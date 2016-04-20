'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var SelectField = require('material-ui/SelectField')['default'];
var FormComponentMixin = require('./FormComponentMixin');

var FormsySelect = React.createClass({
  displayName: 'FormsySelect',

  mixins: [Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleChange: function handleChange(event) {
    this.setValue(event.target.value);
  },

  render: function render() {
    return React.createElement(SelectField, _extends({}, this.props, {
      onChange: this.handleChange,
      errorText: this.getErrorMessage(),
      value: this.getValue() }));
  }
});

module.exports = FormsySelect;