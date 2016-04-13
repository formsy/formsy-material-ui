import React from 'react';
import Formsy from 'formsy-react';
import TimePicker from 'material-ui/lib/TimePicker/TimePicker';
import { _setMuiComponentAndMaybeFocus } from './utils';

let FormsyTime = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired
  },

  handleValueChange: function (event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    return (
      <TimePicker
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        onChange={this.handleValueChange}
      />
    );
  }
});

module.exports = FormsyTime;
