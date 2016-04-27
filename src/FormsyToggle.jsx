import React from 'react';
import Formsy from 'formsy-react';
import Toggle from 'material-ui/Toggle';
import {_setMuiComponentAndMaybeFocus} from './utils';

let FormsyToggle = React.createClass({
  mixins: [Formsy.Mixin],

  propTypes: {
    defaultToggled: React.PropTypes.bool,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  componentDidMount() {
    this.setValue(this._muiComponent.isToggled());
  },

  _setMuiComponentAndMaybeFocus: _setMuiComponentAndMaybeFocus,

  render() {
    const {defaultToggled, ...rest} = this.props;
    let value = this.getValue();

    if (typeof value === 'undefined') {
      value = (typeof defaultToggled !== 'undefined') ? defaultToggled : false;
    }
    
    return (
      <Toggle
        {...rest}
        onToggle={this.handleChange}
        ref={this._setMuiComponentAndMaybeFocus}
        toggled={value}
      />
    );
  }
});

module.exports = FormsyToggle;
