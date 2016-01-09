import React from 'react';
import Formsy from 'formsy-react';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import FormComponentMixin from './FormComponentMixin';

let FormsyRadioGroup = React.createClass({
  mixins: [ Formsy.Mixin, FormComponentMixin ],

  componentDidMount: function () {
    this.setValue(this._radio.getSelectedValue());
  },

  render: function () {
    return (
      <RadioButtonGroup
        {...this.props}
        ref={(c) => this._radio = c}
        onChange={this.handleValueChange} >
        {this.props.children}
      </RadioButtonGroup>
    );
  }
});

module.exports = FormsyRadioGroup;
