const React = require('react');
const Formsy = require('formsy-react');

let FormsyRadio = React.createClass({
  mixins: [ Formsy.Mixin ],

  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render: function () {}
});

module.exports = FormsyRadio;
