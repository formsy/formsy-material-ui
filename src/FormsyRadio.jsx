import { Component } from 'react';
import { HOC } from 'formsy-react';


class FormsyRadio extends Component {
  // Material-UI replaces any component inside RadioButtonGroup 
  // with RadioButton, so no need to render it here.
  render() {}
}

export default HOC(FormsyRadio);
