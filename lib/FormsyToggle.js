'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var Toggle = require('material-ui/lib/toggle');
var FormComponentMixin = require('./FormComponentMixin');

var FormsyToggle = React.createClass({
  displayName: 'FormsyToggle',

  mixins: [Formsy.Mixin, FormComponentMixin],

  componentDidMount: function componentDidMount() {
    this.setValue(this._toggle.isToggled());
  },

  render: function render() {
    var _this = this;

    return React.createElement(Toggle, _extends({}, this.props, {
      ref: function (c) {
        return _this._toggle = c;
      },
      onToggle: this.handleValueChange }));
  }
});

module.exports = FormsyToggle;