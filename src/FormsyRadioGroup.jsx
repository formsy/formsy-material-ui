import React from 'react';
import Formsy from 'formsy-react';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyRadioGroup = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
  },

  mixins: [Formsy.Mixin],

  componentDidMount() {
    this.setValue(this.muiComponent.getSelectedValue());
  },

  handleValueChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
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
  },
});

export default FormsyRadioGroup;
