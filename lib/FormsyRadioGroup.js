'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var Formsy = require('formsy-react');
var RadioButtonGroup = require('material-ui/RadioButton/RadioButtonGroup')['default'];
var FormComponentMixin = require('./FormComponentMixin');

var FormsyRadioGroup = React.createClass({
  displayName: 'FormsyRadioGroup',

  mixins: [Formsy.Mixin, FormComponentMixin],

  componentDidMount: function componentDidMount() {
    this.setValue(this._radio.getSelectedValue());
  },

  render: function render() {
    var _this = this;

    return React.createElement(
      RadioButtonGroup,
      _extends({}, this.props, {
        ref: function (c) {
          return _this._radio = c;
        },
        onChange: this.handleValueChange }),
      this.props.children
    );
  }
});

module.exports = FormsyRadioGroup;