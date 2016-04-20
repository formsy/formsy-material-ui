'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var DatePicker = require('material-ui/DatePicker/DatePicker');
var FormComponentMixin = require('./FormComponentMixin');

var FormsyDate = React.createClass({
  displayName: 'FormsyDate',

  mixins: [Formsy.Mixin, FormComponentMixin],

  render: function render() {
    return React.createElement(DatePicker, _extends({
      formatDate: function (date) {
        return date.toISOString().substring(0, 10);
      }
    }, this.props, {
      onChange: this.handleValueChange }));
  }
});

module.exports = FormsyDate;