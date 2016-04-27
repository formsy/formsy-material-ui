import React from 'react';
import Formsy from 'formsy-react';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyRadioGroup = React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  componentDidMount() {
    this.setValue(this.muiComponent.getSelectedValue());
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    return (
      <RadioButtonGroup
        {...this.props}
        ref={this.setMuiComponentAndMaybeFocus}
        onChange={this.handleValueChange}
      >
        {this.props.children}
      </RadioButtonGroup>
    );
  }
});

export default FormsyRadioGroup;
