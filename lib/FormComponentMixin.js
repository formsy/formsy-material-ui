'use strict';

var React = require('react');

module.exports = {

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function handleValueChange(event, value) {
    this.setValue(value);
  }

};