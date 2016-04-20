import React from 'react';
import keycode from 'keycode';
import Formsy from 'formsy-react';
import TextField from 'material-ui/TextField';
import {_setMuiComponentAndMaybeFocus} from './utils';

let FormsyText = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.any,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func
  },

  handleBlur: function handleBlur(event) {
    this.setValue(event.currentTarget.value);
    if (this.props.onBlur) this.props.onBlur(event);
  },

  handleKeyDown: function handleKeyDown(event) {
    if (keycode(event) === 'enter') this.handleEnterKeyDown(event);
    if (this.props.onKeyDown) this.props.onKeyDown(event, event.currentTarget.value);
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render: function () {
    // value must not be passed in, because it makes the field value unchangeable.
    const { value, ...props } = this.props;
    return (
      <TextField
        {...props}
        ref={this._setMuiComponentAndMaybeFocus}
        defaultValue={value}
        onBlur={this.handleBlur}
        onFocus={this.props.onFocus}
        onKeyDown={this.handleKeyDown}
        errorText={this.getErrorMessage()}
      />
    );
  }
});

export default  FormsyText;
