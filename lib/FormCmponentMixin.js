'use strict';

var React = require('react');

var FormComponentMixin = {
  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string
  },

  handleChange: function handleChange(event) {
    this.setValue(event.target.value);
  },

  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
  }
};

module.exports = { FormComponentMixin: FormComponentMixin };