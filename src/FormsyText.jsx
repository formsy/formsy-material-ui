import React from 'react';
import Formsy from 'formsy-react';
import TextField from 'material-ui/lib/text-field';
import { _setMuiComponentAndMaybeFocus } from './utils';

let FormsyText = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleEnterKeyDown: function handleEnterKeyDown(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onEnterKeyDown) this.props.onEnterKeyDown(event, event.currentTarget.value);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    return (
      <TextField
        {...this.props}
        ref={this._setMuiComponentAndMaybeFocus}
        defaultValue={this.props.value}
        onBlur={this.handleBlur}
        onFocus={this.props.onFocus}
        onEnterKeyDown={this.handleEnterKeyDown}
        errorText={this.getErrorMessage()}
      />
    );
  }
});

module.exports = FormsyText;
