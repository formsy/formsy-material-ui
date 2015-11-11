'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var Checkbox = require('material-ui/lib/checkbox');
var FormComponentMixin = require('./FormComponentMixin');

var FormsyCheckbox = React.createClass({
  displayName: 'FormsyCheckbox',

  mixins: [Formsy.Mixin, FormComponentMixin],

  componentDidMount: function componentDidMount() {
    this.setValue(this._checkbox.isChecked());
  },

  render: function render() {
    var _this = this;

    return React.createElement(Checkbox, _extends({}, this.props, {
      ref: function (c) {
        return _this._checkbox = c;
      },
      onCheck: this.handleValueChange }));
  }
});

module.exports = FormsyCheckbox;