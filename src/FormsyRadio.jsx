import createClass from 'create-react-class';
import Formsy from 'formsy-react';

const FormsyRadio = createClass({
  mixins: [Formsy.Mixin],

  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render() {},
});

export default FormsyRadio;
