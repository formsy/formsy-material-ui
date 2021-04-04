import createClass from 'create-react-class';
import Formsy from 'formsy-react';

const FormsyRadio = createClass<any, any>({
  mixins: [Formsy.Mixin],

  // Material-UI replaces any component inside RadioButtonGroup with RadioButton, so no need to render it here
  render() {
    return null;
  },
});

export default FormsyRadio;
