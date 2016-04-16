import React from 'react';
import Formsy from 'formsy-react';
import DatePicker from 'material-ui/DatePicker';
import {_setMuiComponentAndMaybeFocus} from './utils';

const FormsyDate = React.createClass({
  mixins: [Formsy.Mixin],

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
      <DatePicker
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        defaultDate={this.props.value}
        onChange={this.handleValueChange}
        errorText={this.getErrorMessage()}
        value={this.getValue()}
      />
    );
  }
});

export default FormsyDate;
