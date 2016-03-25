import React from 'react';
import Formsy from 'formsy-react';
import Toggle from 'material-ui/lib/Toggle';
import { _setMuiComponentAndMaybeFocus } from './utils';

let FormsyToggle = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  componentDidMount: function () {
    this.setValue(this._muiComponent.isToggled());
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    return (
      <Toggle
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        onToggle={this.handleValueChange}
      />
    );
  }
});

module.exports = FormsyToggle;
