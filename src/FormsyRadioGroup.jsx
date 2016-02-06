import React from 'react';
import Formsy from 'formsy-react';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import { _setMuiComponentAndMaybeFocus } from './utils';

let FormsyRadioGroup = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
  },

  componentDidMount: function () {
    this.setValue(this._muiComponent.getSelectedValue());
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    return (
      <RadioButtonGroup
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        onChange={this.handleValueChange}
      >
        {this.props.children}
      </RadioButtonGroup>
    );
  }
});

module.exports = FormsyRadioGroup;
