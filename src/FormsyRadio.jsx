import React from 'react';
import Formsy from 'formsy-react';

const FormsyRadio = React.createClass({

  mixins: [Formsy.Mixin],

  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render() {},
});

export default FormsyRadio;
