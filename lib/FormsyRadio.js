'use strict';

var React = require('react');
var Formsy = require('formsy-react');

var FormsyRadio = React.createClass({
  displayName: 'FormsyRadio',

  mixins: [Formsy.Mixin],

  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render: function render() {}
});

module.exports = FormsyRadio;