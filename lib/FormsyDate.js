'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var DatePicker = require('material-ui/lib/date-picker/date-picker');
var FormComponentMixin = require('./FormComponentMixin');

var FormsyDate = React.createClass({
  displayName: 'FormsyDate',

  mixins: [Formsy.Mixin, FormComponentMixin],

  render: function render() {
    return React.createElement(DatePicker,
    // Sets the default date format to be ISO8601 (YYYY-MM-DD), accounting for current timezone
    _extends({ formatDate: function (date) {
        return new Date(date.toDateString() + " 12:00:00 +0000").toISOString().substring(0, 10);
      }
    }, this.props, {
      defaultValue: this.props.value,
      onChange: this.handleValueChange,
      errorText: this.getErrorMessage(),
      value: this.getValue() }));
  }
});

module.exports = FormsyDate;