'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var TimePicker = require('material-ui/TimePicker/TimePicker');
var FormComponentMixin = require('./FormComponentMixin');

var FormsyTime = React.createClass({
  displayName: 'FormsyTime',

  mixins: [Formsy.Mixin, FormComponentMixin],

  render: function render() {
    return React.createElement(TimePicker, _extends({}, this.props, {
      onChange: this.handleValueChange }));
  }
});

module.exports = FormsyTime;